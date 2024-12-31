import pako from "pako";

export async function fetchData(token) {
    const response = await fetch("https://api.getupnote.com/v1/sync", {
      method: "GET",
      headers: {
        "Authentication-Token": token,
      },
    });
  
    if (!response.ok) {
      if (response.status === 401) {
        throw new Error("Login token expired, please login again.");
      }
      throw new Error("Data fetch failed!");
    }
  
    try {
      // Read the raw text response containing multiple lines
      const base64Data = await response.text();
  
      // Split the lines
      const lines = base64Data.split("\n").filter((line) => line.trim() !== "");
  
      // Object to store data by namespace
      const dataByNamespace = {
        tags: [],
        workspaces: [],
        organizers: [],
        lists: [],
        notebooks: [],
        filters: [],
        notes: [],
      };
  
      let timeData = null;
      var i = 0
      var currentline = null;
      for (const line of lines) {
        try {
          i = i+1;
         currentline = line;
  
          try {
              timeData = JSON.parse(line).time
              continue;
          }
          catch {
              // debugger;
          }
  
          // Decode the Base64 line to binary
          const binaryArray = Uint8Array.from(atob(line), (char) =>
            char.charCodeAt(0)
          );
  
          // Decompress the GZIP data
          const decompressedData = pako.inflate(binaryArray, { to: "string" });
          // debugger;
          // Parse the JSON
          const jsonData = JSON.parse(decompressedData);
  
          if (
            jsonData.namespace &&
            dataByNamespace.hasOwnProperty(jsonData.namespace)
          ) {
            // Store in the appropriate namespace
            dataByNamespace[jsonData.namespace].push(jsonData);
          }
        } catch (error) {
          // debugger;
          console.error("Error processing line:", line, error);
        }
      }
  
      console.log("Data by Namespace:", dataByNamespace);
      console.log("Time Data:", timeData);
  
      // debugger;
      return { dataByNamespace, timeData };
    } catch (error) {
      // debugger;
      console.error("Error processing response:", error);
      throw new Error("Failed to process response data.");
    }
}
