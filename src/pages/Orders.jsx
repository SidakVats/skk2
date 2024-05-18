import React, { useState, useEffect } from "react";
import Modal from "../components/Modal";
import {
  GridComponent,
  ColumnsDirective,
  ColumnDirective,
  Resize,
  Sort,
  ContextMenu,
  Filter,
  Page,
  ExcelExport,
  PdfExport,
  Edit,
  Inject,
} from "@syncfusion/ej2-react-grids";

import { ordersData, contextMenuItems, ordersGrid } from "../data/dummy";
import { Header } from "../components";

import { FiSettings } from "react-icons/fi";
import { TooltipComponent } from "@syncfusion/ej2-react-popups";

import { Navbar, Footer, Sidebar, ThemeSettings } from "../components";

import { useStateContext } from "../contexts/ContextProvider";

const Orders = () => {
  const [showModal, setShowModal] = useState(false);
  const [selectedOrder, setSelectedOrder] = useState(null);

  const handleOrderClick = (order) => {
    setSelectedOrder(order);
    setShowModal(true);
    console.log("Selected Order:", order);
  };

  const editing = { allowDeleting: true, allowEditing: true };

  const {
    setCurrentColor,
    setCurrentMode,
    currentMode,
    activeMenu,
    currentColor,
    themeSettings,
    setThemeSettings,
  } = useStateContext();

  useEffect(() => {
    const currentThemeColor = localStorage.getItem("colorMode");
    const currentThemeMode = localStorage.getItem("themeMode");
    if (currentThemeColor && currentThemeMode) {
      setCurrentColor(currentThemeColor);
      setCurrentMode(currentThemeMode);
    }
  }, []);
  return (
    <>
      <div className={currentMode === "Dark" ? "dark" : ""}>
        <div className="flex relative dark:bg-main-dark-bg">
          <div className="fixed right-10 bottom-28" style={{ zIndex: "10" }}>
            <TooltipComponent content="Settings" position="Top">
              <button
                type="button"
                onClick={() => setThemeSettings(true)}
                style={{ background: currentColor, borderRadius: "50%" }}
                className="text-3xl text-white p-3 hover:drop-shadow-xl hover:bg-light-gray"
              >
                <FiSettings />
              </button>
            </TooltipComponent>
          </div>
          {activeMenu ? (
            <div className="w-72 fixed sidebar dark:bg-secondary-dark-bg bg-white ">
              <Sidebar />
            </div>
          ) : (
            <div className="w-0 dark:bg-secondary-dark-bg">
              <Sidebar />
            </div>
          )}
          <div
            className={
              activeMenu
                ? "dark:bg-main-dark-bg  bg-main-bg min-h-screen md:ml-72 w-full  "
                : "bg-main-bg dark:bg-main-dark-bg  w-full min-h-screen flex-2 "
            }
          >
            <div className="fixed md:static bg-main-bg dark:bg-main-dark-bg navbar w-full ">
              <Navbar />
            </div>
            <div>
              <div className="m-5 md:m-10 p-2 md:p-10 bg-white rounded-3xl">
                <Header category="Page" title="Orders" />
                <GridComponent
                  id="gridcomp"
                  dataSource={ordersData}
                  allowPaging
                  allowSorting
                  allowExcelExport
                  // allowPdfExport
                  contextMenuItems={contextMenuItems}
                  editSettings={editing}
                  // rowSelected={(args) => handleOrderClick(args.data)}
                  // onClick={handleOrderClick}
                >
                  <ColumnsDirective  onClick={handleOrderClick}>
                    {/* eslint-disable-next-line react/jsx-props-no-spreading */}
                    {ordersGrid.map((item, index) => (
                      <ColumnDirective key={index} {...item} />
                    ))}
                  </ColumnsDirective>
                  <Inject
                    services={[
                      Resize,
                      Sort,
                      ContextMenu,
                      Filter,
                      Page,
                      ExcelExport,
                      Edit,
                      PdfExport,
                    ]}
                  />
                </GridComponent>
                {/* <Modal
                  isOpen={showModal}
                  onClose={() => setShowModal(false)}
                  order={selectedOrder}
                /> */}
              </div>
              {themeSettings && <ThemeSettings />}
            </div>
            <Footer />
          </div>
        </div>
      </div>
    </>
  );
};

export default Orders;
