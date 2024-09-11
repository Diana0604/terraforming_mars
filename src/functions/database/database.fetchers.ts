//getter
export const fetchGet = (route: string, callback: (data: any) => void) =>
  fetch(route, { method: 'get' }).then(async (response) => {
    const data: any = await response.json();
    callback(data);
  })

//poster
export const fetchPost = (route: string, body: any, callback?: (response: any) => void) =>
  fetch(route, {
    method: "post",
    body: JSON.stringify(body),
  }).then(async (response) => callback ? callback(response) : undefined)

//deleter
export const fetchDelete = (route: string, body: any, callback?: (response: any) => void) =>
  fetch(route, {
    method: "delete",
    body: JSON.stringify(body)
  }).then(async (response) => callback ? callback(response) : undefined)

export const fetchPut = (route: string, body: any, callback?: (response: any) => void) =>
  fetch(route, {
    method: "put",
    body: JSON.stringify(body)
  }).then(async (response) => callback ? callback(response) : undefined)