import React from "react";
import { apiBaseUrl } from "../App";

  export const getTodos = async () => {
    try {
      const response = await fetch(`${apiBaseUrl}/todos`);
      const allTodos = await response.json();
        return  allTodos

    } catch (e) {
      console.log(e);
    }
  }; 