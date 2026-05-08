"use client";
import classNames from "classnames";
import Collapse from "./Collapse";
import CollapseCate from "./CollapseCate";
import Sort from "@/components/Icons/Sort";
import FilterUser from "./FilterUser";
import FilterPrice from "./FilterPrice";
import FilterTaste from "./FilterTaste";
import { map } from "lodash";
import { Category } from "@/types";

type Props = {
  categories?: Category[];
  visible: boolean;
  setVisible: React.Dispatch<React.SetStateAction<boolean>>;
};

export default function ProductCategoriesMobile({
  categories,
  visible = false,
  setVisible,
}: Props) {
  return visible ? (
    <div
      id={`dialog-bottom`}
      className="relative z-50"
      aria-labelledby="slide-over"
      tabIndex={-1}
      role="dialog"
      aria-modal="true"
      onClick={(prev) => setVisible(!prev)}
    >
      <div
        className={classNames(
          "fixed inset-0 bg-gray-500 bg-opacity-75 transition-all",
          {
            "opacity-100 duration-500 ease-in-out visible": visible,
          },
          { "opacity-0 duration-500 ease-in-out invisible": !visible }
        )}
      ></div>
      <div className={classNames({ "fixed inset-0 overflow-hidden": visible })}>
        <div className="absolute inset-0 overflow-hidden">
          <div
            className={classNames(
              "pointer-events-none fixed max-w-full",
              "inset-x-0 bottom-0"
            )}
          >
            <div
              className={classNames(
                "pointer-events-auto relative w-full h-full transform transition ease-in-out duration-500",
                { "translate-y-full": !visible },
                { "translate-y-0": visible }
              )}
              onClick={(event) => {
                event.preventDefault();
                event.stopPropagation();
              }}
            >
              <div
                className={classNames(
                  "flex flex-col h-full overflow-y-scroll bg-white p-2 shadow-xl rounded-lg"
                )}
              >
                <div className="rounded-tl-xl rounded-tr-xl py-[10px] text-xl shadow-Shadow/xs bg-Moss/400 text-white border-Moss/400">
                  <div className="text-center text-xl">Danh Mục Sản Phẩm</div>
                </div>
                <button
                  onClick={() => setVisible(false)}
                  type="button"
                  data-drawer-hide="drawer-bottom-example"
                  aria-controls="drawer-bottom-example"
                  className="text-gray-400 bg-transparent hover:bg-gray-200 hover:text-gray-900 rounded-lg body-xs-medium w-8 h-8 absolute top-2.5 end-2.5 inline-flex items-center justify-center"
                >
                  <svg
                    className="w-3 h-3"
                    aria-hidden="true"
                    xmlns="http://www.w3.org/2000/svg"
                    fill="none"
                    viewBox="0 0 14 14"
                  >
                    <path
                      stroke="currentColor"
                      stroke-linecap="round"
                      stroke-linejoin="round"
                      strokeWidth="2"
                      d="m1 1 6 6m0 0 6 6M7 7l6-6M7 7l-6 6"
                    />
                  </svg>
                </button>
                <div className="h-[50vh] overflow-y-auto">
                  <div className="my-5 rounded-xl bg-white">
                    {map(categories, (item: any) => (
                      <CollapseCate category={item} />
                    ))}
                  </div>
                  <div className="my-5 rounded-xl bg-white">
                    <div className="flex items-center py-[10px] px-[20px] gap-4 border-b-2 border-Moss/100">
                      <Sort />
                      <div className="text-center text-xl text-Moss/700">
                        Bộ lọc nâng cao
                      </div>
                    </div>
                    <Collapse
                      heading="Đối tượng sử dụng"
                      className={classNames(
                        "border-b-Moss/100 border-b-[0.5px] hover:bg-Moss/50 hover:border-l-Moss/400 hover:border-l-[4px] justify-center"
                      )}
                      childComponent={<FilterUser />}
                    />
                    <Collapse
                      heading="Giá bán"
                      className={classNames(
                        "border-b-Moss/100 border-b-[0.5px] hover:bg-Moss/50 hover:border-l-Moss/400 hover:border-l-[4px] justify-center"
                      )}
                      childComponent={<FilterPrice />}
                    />
                    <Collapse
                      heading="Mùi vị/ Mùi hương"
                      className={classNames(
                        "border-b-Moss/100 border-b-[0.5px] hover:bg-Moss/50 hover:border-l-Moss/400 hover:border-l-[4px] justify-center"
                      )}
                      childComponent={<FilterTaste />}
                    />
                    <Collapse
                      heading="Nước sản xuất"
                      className={classNames(
                        "border-b-Moss/100 border-b-[0.5px] hover:bg-Moss/50 hover:border-l-Moss/400 hover:border-l-[4px] justify-center"
                      )}
                    />
                    <Collapse
                      heading="Thương hiệu"
                      className={classNames(
                        "border-b-Moss/100 border-b-[0.5px] hover:bg-Moss/50 hover:border-l-Moss/400 hover:border-l-[4px] justify-center"
                      )}
                    />
                    <Collapse
                      heading="Chỉ định"
                      className={classNames(
                        "border-b-Moss/100 border-b-[0.5px] hover:bg-Moss/50 hover:border-l-Moss/400 hover:border-l-[4px] justify-center"
                      )}
                    />
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  ) : null;
}
