export const minimumLoadingTime = async (): Promise<void> => {
  await new Promise((resolve) => setTimeout(resolve, 2000));
};
