import React from "react";
import KyrosPageCarded from "@kyros/core/KyrosPageCarded/KyrosPageCarded";
import { useThemeMediaQuery } from "@kyros/hooks";
import withReducer from "app/store/withReducer";
import reducer from "../store";
import SalesGroupForm from "./SalesGroupForm";
import SalesGroupView from "./SalesGroupView";

function SalesGroups() {
  const isMobile = useThemeMediaQuery((theme) => theme.breakpoints.down("lg"));
  return (
    <>
      <KyrosPageCarded
        header={<SalesGroupForm />}
        content={<SalesGroupView />}
        scroll={isMobile ? "normal" : "content"}
      />
    </>
  );
}

export default withReducer("userManagementApp", reducer)(SalesGroups);
