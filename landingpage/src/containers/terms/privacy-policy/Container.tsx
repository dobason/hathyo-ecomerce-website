/* eslint-disable prettier/prettier */
import React from "react";
import Button from "@/components/Button";
import Call from "@/components/Icons/Call";
import Mail from "@/components/Icons/Mail";
import { map } from "lodash";
import Link from "next/link";

const CONTENT = [
  // 1
  {
    header: "Mục đích và phạm vi thu thập",
    contents: (
      <div className="flex flex-col gap-2 ck-content">
        <h4>
          <strong>Mục đích và phạm vi thu thập</strong>
        </h4>
        <strong>
          <i>+ Mục đích thu thập thông tin:</i>
        </strong>

        <p>
          Chúng tôi thu thập thông tin cá nhân chỉ cần thiết nhằm phục vụ cho
          các mục đích sau đây:
        </p>
        <ul>
          <li>
            {" "}
            Đơn Hàng: để xử lý các vấn đề liên quan đến đơn đặt hàng của bạn;
          </li>
          <li>
            {" "}
            Duy Trì Tài Khoản: để tạo và duy trình tài khoản của bạn với chúng
            tôi, bao gồm cả các chương trình khách hàng thân thiết hoặc các
            chương trình thưởng đi kèm với tài khoản của bạn.
          </li>
          <li>
            {" "}
            Dịch Vụ Người Tiêu Dùng, Dịch Vụ Chăm Sóc Khách Hàng: bao gồm các
            phản hồi cho các yêu cầu, khiếu nại và phản hồi của bạn;
          </li>
          <li>
            {" "}
            Cá Nhân Hóa: Chúng tôi có thể tổ hợp dữ liệu được thu thập để có một
            cái nhìn hoàn chỉnh hơn về một người tiêu dùng và từ đó cho phép
            chúng tôi phục vụ tốt hơn với sự cá nhân hóa mạnh hơn ở các khía
            cạnh, bao gồm nhưng không giới hạn: (i) để cải thiện và cá nhân hóa
            trải nghiệm của bạn trên website thương mại điện tử hathyo.com (ii)
            để cải thiện các tiện ích, dịch vụ, điều chỉnh chúng phù hợp với các
            nhu cầu được cá thể hóa và đi đến những ý tưởng dịch vụ mới (iii) để
            phục vụ bạn với những giới thiệu, quảng cáo được điều chỉnh phù hợp
            với sự quan tâm của bạn.
          </li>
          <li>
            {" "}
            An Ninh: cho các mục đích ngăn ngừa các hoạt động phá hủy tài khoản
            người dùng của khách hàng hoặc các hoạt động giả mạo khách hàng.
          </li>
          <li>
            Theo yêu cầu của pháp luật: tùy quy định của pháp luật vào từng thời
            điểm, chúng tôi có thể thu thập, lưu trữ và cung cấp theo yêu cầu
            của cơ quan nhà nước có thẩm quyền.
          </li>
        </ul>
        <strong>
          <i>Phạm vi thu thập: </i>
        </strong>
        <p>
          <i className="underline">Đối với Người bán:</i> Đối với Người bán,
          Chúng tôi thu thập thông tin tổ chức của bạn khi bạn tạo tài khoản và
          hồ sơ người bán hàng trên hệ thống nhằm xác thực bạn đủ tư cách pháp
          nhân để cung cấp hàng hoá, dịch vụ và cung cấp hoá đơn cho người mua,
          thông tin thu thập cụ thể bao gồm:
        </p>
        <ul>
          <li>Tên doanh nghiệp;</li>
          <li>Mã doanh nghiệp;</li>
          <li>Tên cửa hàng;</li>
          <li>Email;</li>
          <li>Tên người liên hệ;</li>
          <li>Email người liên hệ;</li>
          <li>Điện thoại người liên hệ;</li>
          <li>Hình ảnh giấy phép kinh doanh của công ty bạn;</li>
          <li>
            Hình ảnh tài liệu hợp đồng chứng minh bạn là nhà phân phối chính
            hãng;
          </li>
          <li>Hình ảnh chứng từ bảo hộ tên cửa hàng/thương hiệu, nếu có;</li>
          <li>Thông tin tài khoản ngân hàng doanh nghiệp.</li>
          <li>Điện thoại người giao gói hàng;</li>
          <li>
            Địa chỉ lấy hàng; (Quốc gia, tỉnh/thành phố, quận/huyện, phường xã,
            địa chỉ chi tiết số nhà, đường)
          </li>
        </ul>
        <p>
          <i className="underline">Đối với Người mua:</i> Khi đăng ký dịch vụ,
          thông tin cá nhân mà HATHYO thu thập bao gồm:
        </p>
        <ul>
          <li>Họ và tên</li>
          <li>Email</li>
          <li>Số điện thoại (phục vụ cho mục đích giao hàng)</li>
          <li>Mật khẩu</li>
          <li>Địa chỉ (phục vụ cho mục đích giao hàng)</li>
        </ul>
        <h4>
          <strong>Phạm vi sử dụng thông tin:</strong>
        </h4>
        <strong>
          <i>Đối với người mua</i>
        </strong>
        <p>
          Thông tin cá nhân của bạn sẽ được sử dụng cho các mục đích trao đổi
          của bạn như để liên hệ tư vấn, giải quyết thắc mắc và khiếu nại của
          bạn. Thông tin cá nhân của bạn cũng được dùng cho mục đích liên hệ và
          giao hàng cho bạn khi bạn đặt hàng trên Hathyo, từ nhân viên vận
          chuyển của Hathyo hoặc các Công ty đối tác liên kết vận chuyển (có ký
          hợp đồng bảo mật thông tin khách hàng với Hathyo).
        </p>
        <p>
          Bằng việc cung cấp thông tin cá nhân, bạn đồng ý với việc bạn cho phép
          Chúng tôi lưu trữ các thông tin của bạn nhằm mục đích phục vụ cho bạn
          tốt nhất có thể theo các yêu cầu của bạn. Ngoài ra, chúng tôi sẽ dùng
          thông tin đó để thực hiện các công việc sau:
        </p>
        <ul>
          <li>
            Trả lời, xử lý các góp ý của bạn về sản phẩm và dịch vụ chúng tôi
            cung cấp nhằm cải thiện chất lượng dịch vụ của Chúng tôi theo góp ý
            của bạn.
          </li>

          <li>
            Giúp bạn có cái nhìn rõ ràng hơn về sản phẩm và dịch vụ chúng tôi
            cung cấp.
          </li>
          <li>Thông báo cho bạn về sản phẩm, chương trình và dịch vụ mới.</li>
          <li>
            Cho các mục đích quản trị và đảm bảo chất lượng sản phẩm, dịch vụ
            của Chúng tôi.
          </li>
        </ul>
        <strong>
          <i>Đối với người bán</i>
        </strong>
        <p>
          Thông tin cá nhân của bạn sẽ được sử dụng cho các mục đích xác minh
          bạn đủ tư cách pháp nhân bán hàng chính hãng trên hệ thống. Thông tin
          này cũng được dùng để trao đổi với bạn như để liên hệ tư vấn, giải
          quyết thắc mắc và khiếu nại của bạn cũng như các vấn đề liên quan đến
          việc kinh doanh của bạn trên hệ thống Hathyo.
        </p>
        <p>
          Bằng việc cung cấp thông tin cá nhân, bạn đồng ý với việc bạn cho phép
          Chúng tôi lưu trữ các thông tin của bạn nhằm mục đích phục vụ cho việc
          kinh doanh của bạn tốt nhất có thể trên hệ thống. Ngoài ra, chúng tôi
          sẽ dùng thông tin đó để thực hiện các công việc sau:
        </p>
        <ul>
          <li>Gửi thông tin đối soát doanh số bán hàng đến bạn.</li>
          <li>Thanh toán doanh thu cho bạn.</li>
          <li>
            Trả lời, xử lý các góp ý của bạn nhằm cải thiện chất lượng dịch vụ
            của Chúng tôi.
          </li>
          <li>
            Giúp bạn có cái nhìn rõ ràng hơn về các dịch vụ chúng tôi cung cấp.
          </li>
          <li>
            Thông báo, nhắc nhở cho bạn về các ưu đãi, chương trình và dịch vụ
            mới.
          </li>
          <li>
            Thông báo, nhắc nhở bạn về việc cập nhật hồ sơ thương nhân của bạn.
          </li>
          <li>
            Thông báo, nhắc nhở bạn về các thay đổi, cập nhật chính sách trên hệ
            thống.
          </li>
          <li>
            Thông báo, nhắc nhở bạn về các vi phạm chính sách của bạn (nếu có)
            trên hệ thống.
          </li>
          <li>
            Cho các mục đích quản trị và đảm bảo chất lượng sản phẩm, dịch vụ
            trên hệ thống của Chúng tôi.
          </li>
          <p>
            <strong>
              Các bên thứ ba được quyền tiếp cận thông tin cá nhân của người
              dùng:
            </strong>
          </p>
          <p>
            Hathyo cam kết sẽ không chia sẻ thông tin của người dùng cho bất kỳ
            một công ty nào khác ngoại trừ các trường hợp đặc biệt thực sự cần
            thiết như sau:
          </p>
          <ul>
            <li>
              <p>Khi có yêu cầu của các cơ quan pháp luật.</p>
            </li>
            <li>
              <p>
                Nghiên cứu thị trường và các báo cáo phân tích: Tuyệt đối không
                cung cấp cho bên thứ ba, thông tin chi tiết sẽ được ẩn và chỉ
                được dùng để phục vụ công việc thống kê.
              </p>
            </li>
            <li>
              <p>
                Trao đổi thông tin với các bên thứ 3 là đối tác, Kho liên kết
                chính xác của Hathyo: Hathyo&nbsp;có thể chuyển Thông Tin Người
                Dùng cho các Kho liên kết để làm phân tích dữ liệu, tiếp thị và
                hỗ trợ dịch vụ khách hàng; hoặc trao đổi với bên thứ ba cho mục
                đích chống gian lận và giảm rủi ro tín dụng.
              </p>
              <p>
                Ngoài các trường hợp nêu trên, Hathyo&nbsp;sẽ có thông báo cụ
                thể cho người dùng khi phải tiết lộ thông tin cá nhân của người
                dùng cho một bên thứ ba. Trong trường hợp này, Hathyo&nbsp;cam
                kết sẽ chỉ tiết lộ thông tin khi được sự đồng ý của người dùng.
              </p>
              <p>Thời gian lưu trữ thông tin:</p>
            </li>
            <li>
              <p>
                Thông tin người dùng, cũng như các trao đổi giữa người dùng và
                Hathyo đều được lưu trữ và bảo mật bởi hệ thống của Hathyo.
              </p>
            </li>
            <li>
              <p>
                Thông tin sẽ được lưu trữ từ khi người dùng cung cấp trên hệ
                thống của Hathyo&nbsp;và không bị mất đi (lưu trữ vĩnh viễn).
                Hathyo&nbsp;chỉ xóa đi dữ liệu này nếu người dùng có yêu cầu
                hoặc vi phạm quy định bán hàng trên sàn TMĐT HATHYO.
              </p>
            </li>
            <li>
              <p>
                Hathyo&nbsp;có các biện pháp thích hợp về kỹ thuật và an ninh để
                ngăn chặn việc truy cập, sử dụng trái phép thông tin người dùng.
              </p>
              <p>
                Địa chỉ của đơn vị thu thập và quản lý thông tin cá nhân:&nbsp;
              </p>
            </li>
            <li>
              <p>
                Tên đơn vị: <strong>CÔNG TY TNHH CUỘC SỐNG VUI KHỎE</strong>
              </p>
            </li>
            <li>
              <p>Mã số thuế: 0318170229</p>
            </li>
            <li>
              <p>
                Trụ sở chính: 82 Phan Đăng Lưu, Phường Đức Nhuận, TP HCM
              </p>
            </li>
            <li>
              <p>Hotline: 0827000248</p>
            </li>
            <li>
              <p>Email:&nbsp;email@hathyo.com</p>
              <p>
                Phương tiện và công cụ để người dùng tiếp cận và chỉnh sửa dữ
                liệu cá nhân của mình:&nbsp;
              </p>
              <p>
                <i>
                  Nếu người dùng có nhu cầu muốn thay đổi, cập nhật thông tin
                  cung cấp trước đó thì có 2 cách:
                </i>
              </p>
            </li>
            <li>
              <p>
                Cách 1: Liên hệ Hotline CSKH của công ty: 0827000248. Người dùng
                cung cấp đúng thông tin cũ để đối chiếu xác nhận và được cấp
                quyền chỉnh sửa. Thông tin mới sẽ được cập nhật trên hệ thống
                tài khoản của người dùng.
              </p>
            </li>
            <li>
              <p>
                Cách 2:&nbsp;Vào hệ thống&nbsp;đăng ký,&nbsp;đăng nhập tài
                khoản, sau đó tự cập nhật thông tin cá nhân của mình, xác nhận
                hoàn tất thay đổi.
              </p>
              <p>Cam kết bảo mật thông tin cá nhân người dùng</p>
              <p>
                Thông tin cá nhân của người dùng trên Hathyo được cam kết bảo
                mật theo chính sách bảo vệ thông tin cá nhân. Việc thu thập và
                sử dụng thông tin của người dùng chỉ được thực hiện khi có sự
                đồng ý của người dùng trừ những trường hợp pháp luật có quy định
                khác hoặc thỏa thuận khác. Chúng tôi cam kết rằng:
              </p>
            </li>
            <li>
              <p>
                Không sử dụng, không chuyển giao, cung cấp hay tiết lộ cho bên
                thứ 3 nào về thông tin cá nhân của người dùng khi không có sự
                cho phép đồng ý từ người dùng nhằm trục lợi.
              </p>
            </li>
            <li>
              <p>
                Trong trường hợp máy chủ lưu trữ thông tin bị hacker tấn công
                dẫn đến mất mát dữ liệu cá nhân của thành viên, Hathyo sẽ có
                trách nhiệm thông báo vụ việc cho cơ quan chức năng điều tra xử
                lý kịp thời và thông báo cho người dùng được biết.
              </p>
            </li>
            <li>
              <p>
                Chúng tôi yêu cầu các cá nhân khi đăng ký tài khoản và sử dụng
                dịch vụ trên Hathyo phải cung cấp đầy đủ thông tin cá nhân có
                liên quan và chịu trách nhiệm về tính chính xác, pháp lý và cập
                nhật của những thông tin trên. Công ty không chịu trách nhiệm
                cũng như không giải quyết mọi khiếu nại có liên quan đến quyền
                lợi của người dùng nếu xét thấy thông tin cá nhân của người dùng
                đó cung cấp là không chính xác.
              </p>
            </li>
            <li>
              <p>
                Hathyo sẽ không chịu trách nhiệm trong trường hợp thông tin cá
                nhân bị rò rỉ phát sinh từ lỗi kỹ thuật, lỗi đường truyền, lỗi
                phần mềm hoặc lỗi khác không phải do công ty gây ra.
              </p>
              <p>
                Website thiết lập hệ thống bảo vệ thông tin cá nhân người sử
                dụng qua các hình thức sau:
              </p>
            </li>
          </ul>
          <ol>
            <li>
              <p>
                Thiết lập hệ thống tường lửa ngăn ngừa các hình thức tấn công
                mạng.
              </p>
            </li>
            <li>
              <p>
                Đội ngũ kỹ thuật, nhân viên của doanh nghiệp thường xuyên túc
                trực theo dõi toàn bộ hoạt động của trang mạng. Đảm bảo mọi cuộc
                tấn công từ các phía đều được phát hiện kịp thời và thực hiện
                biện pháp ngăn chặn.
              </p>
            </li>
            <li>
              <p>
                Các thông tin cá nhân, thông tin riêng của người sử dụng sẽ được
                lưu trữ theo các quy định của Công ty và thực hiện bảo mật
                nghiêm ngặt theo các quy định của pháp luật.
              </p>
            </li>
          </ol>
          <p>
            Cơ chế tiếp nhận và giải quyết khiếu nại của người tiêu dùng liên
            quan đến việc thông tin cá nhân bị sử dụng sai mục đích hoặc phạm vi
            đã thông báo:
          </p>
          <p>
            Khi người tiêu dùng phát hiện thông tin cá nhân của mình trên Hathyo
            bị sử dụng sai mục đích hoặc ngoài phạm vi sử dụng thông tin, người
            tiêu dùng có thể gửi khiếu nại đến CÔNG TY TNHH CUỘC SỐNG VUI KHỎE
            theo các cách thức sau:
          </p>
          <ul>
            <li>
              <p>Gọi điện thoại đến số hotline: 0827000248</p>
            </li>
            <li>
              <p>Gửi email khiếu nại đến địa chỉ:&nbsp;email@hathyo.com</p>
            </li>
            <li>
              <p>
                Gửi văn bản khiếu nại theo đường bưu điện đến hoặc gửi trực tiếp
                tại trụ sở công ty, địa chỉ: 82 Phan Đăng Lưu, Phường Đức Nhuận, TP HCM.
              </p>
              <p>
                Thời hạn để Công ty xử lý phản ánh liên quan đến thông tin cá
                nhân khách hàng là 07 (bảy) ngày làm việc, kể từ ngày tiếp nhận
                được khiếu nại của người dùng.
              </p>
              <p>
                Trong mọi trường hợp, Hathyo đề cao việc thương lượng, hòa giải
                với người dùng để thống nhất và đưa ra biện pháp giải quyết, xử
                lý khiếu nại.
              </p>
              <p>
                Trong trường hợp hai bên không đạt được sự thỏa thuận như mong
                muốn dẫn đến thương lượng, hòa giải không thành, một trong hai
                bên có quyền đưa vụ việc ra tòa án nhân dân có thẩm quyền để
                giải quyết theo quy định của pháp luật.
              </p>
            </li>
          </ul>
        </ul>
      </div>
    ),
  },
];

function Container() {
  return (
    <main>
      <div className="container m-auto xl:py-8 py-4 xl:gap-8 gap-4 flex-col flex">
        <div className="flex flex-col justify-center items-center mx-auto gap-2 xl:max-w-6xl">
          {map(CONTENT, (parent: any) => (
            <div className="flex">
              <div className="w-full">
                <div className="text-xl !text-Moss/600 font-semibold summary-text">
                  {parent.header}
                </div>
                <div className="text-md text-Grayiron/600 mt-3">
                  {parent.contents}
                </div>
              </div>
            </div>
          ))}
        </div>
        <div className="flex flex-col xl:gap-4 gap-2">
        <div className="flex justify-center">
          <div className="font-semibold text-center text-Moss/700">
            Bạn có muốn tìm thêm thông tin gì không?
          </div>
        </div>
        <div className="flex justify-center gap-5">
          <Button>
            <Link href="tel:0084-827000248">
              <div className="flex justify-center items-center gap-2 body-semibold text-Moss/500">
                <Call className="w-5 h-5"></Call>
                <p className="body-sm-medium">0827000248</p>
              </div>
            </Link>
          </Button>
          <Button>
            <Link href="mailto:email@hathyo.com">
              <div className="flex justify-center items-center gap-2 body-semibold text-Moss/500">
                <Mail className="w-5 h-5"></Mail>
                <p className="body-sm-medium">Email Hathyo</p>
              </div>
            </Link>
          </Button>
        </div>

        </div>

      </div>
    </main>
  );
}

export default Container;
