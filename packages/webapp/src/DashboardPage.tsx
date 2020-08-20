import * as React from "react";
import { useState } from "react";
import { embeddedRuntimeUrl } from "@dashbuilder-js/api";
import { DashboardSelector } from "@dashbuilder-js/selector";

const DB_USER = "admin";
const DB_PASSWORD = "admin";
const DB_URL = "http://localhost:8280";

export function DashboardPage() {
  const [target, setTarget] = useState("");

  const onDashboardSelect = (db: string, page: string) => {
    const newUri = embeddedRuntimeUrl(DB_URL, db, page);
    setTarget(newUri);
  };
  
  return (
    <div>
      <h2>Select your dashboard:</h2>
      <DashboardSelector url={DB_URL} user={DB_USER} password={DB_PASSWORD} onDashboardSelected={onDashboardSelect} />
      <br />
      <iframe frameBorder="0" src={target} width="100%" height="900" />
    </div>
  );
}
