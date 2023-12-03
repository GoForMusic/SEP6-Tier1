export default function fetchJsonp(url: any, callbackName: any) {
  return new Promise((resolve, reject) => {
    const script = document.createElement("script");
    const callbackFunctionName = `jsonpCallbackFunction_${Math.random()
      .toString(36)
      .substr(2, 5)}`;

    // Define the callback function on the window object
    window[callbackFunctionName] = (data) => {
      resolve(data);
      delete window[callbackFunctionName];
      script.remove();
    };

    // Add an error handler
    script.onerror = () => {
      reject(new Error(`JSONP request to ${url} failed`));
      delete window[callbackFunctionName];
      script.remove();
    };

    // Set the source of the script element
    script.src = `${url}&callback=${callbackFunctionName}`;
    document.body.appendChild(script);
  });
}

