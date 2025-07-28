export const adBlocker = async (page) => {
  await page.route('**/*', (route) => {
    const url = route.request().url();
    if (
      url.includes('doubleclick.net') ||
      url.includes('google-analytics.com')
    ) {
      // console.log(`Bloqueando: ${url}`);
      route.abort();
    } else {
      route.continue();
    }
  });
};
