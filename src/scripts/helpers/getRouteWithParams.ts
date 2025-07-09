export const getRouteWithParams = (
  route: string,
  params: string,
  paramsValue: string
): string => {
  const regex = new RegExp(`:${params}`, "g");
  return route.replace(regex, paramsValue);
};
