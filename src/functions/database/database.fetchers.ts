//getter
export const fetchGet = (route: string, callback: (data: any) => void) => {
  fetch(route, { method: 'get' }).then(async (response) => {
    const data: any = await response.json();
    callback(data);
  })
}

export const fetchPost = (route: string, body: any, callback: () => void) => {
  fetch(route, {
    method: "post",
    body: JSON.stringify(body),
  }).then(async (_response) => {
    callback();
  })
}