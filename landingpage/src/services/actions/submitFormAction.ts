"use server";

import { headers as NextHeaders } from "next/headers";
import qs from "qs";

const submitFormAction = async (prevState: any, formData: FormData) => {
  try {
    const headerO = NextHeaders();
    const headers: any = {};
    const body: any = {};
    headerO.forEach((value, key) => {
      headers[key] = value;
    });
    formData.forEach((value, key) => {
      if (!key.includes("$ACTION")) {
        body[key] = value;
      }
    });
    const cloneBody = { ...body };
    delete cloneBody.captchaToken;
    delete cloneBody.action;
    delete cloneBody["cf-turnstile-response"];
    const { name, email, phone } = cloneBody;
    const clientURL = headers["referer"];
    const queryClient =
      clientURL.indexOf("?") > 0
        ? clientURL.slice(clientURL.indexOf("?") + 1, clientURL.length)
        : null;
    const fullUrl = {
      url: clientURL,
      query: queryClient
        ? {
            ...qs.parse(queryClient),
          }
        : null,
    };
    const submitData = {
      name,
      email,
      phone,
      fullData: cloneBody,
      extraData: {
        host: headers.host,
        fullUrl,
        userAgent: headers["user-agent"],
      },
    };
    const result = await fetch(
      `${process.env.CONSUMER_API}/urbox-website/submit-info`,
      {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          captchaToken: body.captchaToken,
          data: submitData,
        }),
      }
    ).then((res) => res.json());
    if (!!result && result?._id) {
      return {
        errorMessage: "",
        done: true,
        toggleToken: !prevState.toggleToken,
        responseId: result?._id,
      };
    }
    console.error(result);
    return {
      errorMessage: "Có lỗi xảy ra, vui lòng thử lại sau",
      done: false,
      toggleToken: !prevState.toggleToken,
      responseId: null,
    };
  } catch (err) {
    console.error(err);
    return {
      errorMessage: "Có lỗi xảy ra, vui lòng thử lại sau",
      done: false,
      toggleToken: !prevState.toggleToken,
      responseId: null,
    };
  }
};

export default submitFormAction;
