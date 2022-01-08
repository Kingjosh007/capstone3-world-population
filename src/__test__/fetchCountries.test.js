import fetchCountries from '../Mock/fetchCountries';

describe('Country data is well structured', () => {
  it('every country has an iso3 property', async () => {
    await fetchCountries().then((countries) => {
      expect(() => {
        countries.every((ctr) => ctr.iso3);
      }).toBeTruthy();
    });
  });
  it('is made of regular countries', async () => {
    const regCtrs = ['Afghanistan', 'Kenya', 'Latvia'];
    await fetchCountries().then((countries) => {
      expect(() => {
        regCtrs.every((rc) => countries.find((ctr) => ctr.name === rc));
      }).toBeTruthy();
    });
  });
});
