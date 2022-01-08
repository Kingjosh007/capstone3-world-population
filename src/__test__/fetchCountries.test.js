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
    const regCtrs = ['Afghanistan', 'Kenya', 'Latvia', 'Vietnam'];
    await fetchCountries().then((countries) => {
      expect(() => {
        regCtrs.every((rc) => countries.find((ctr) => ctr.name === rc));
      }).toBeTruthy();
    });
  });
  it('includes countries blocs', async () => {
    const ctrBlocs = ['Arab World', 'Europe & Central Asia', 'Pre-demographic dividend'];
    await fetchCountries().then((countries) => {
      expect(() => {
        ctrBlocs.every((rc) => countries.find((ctr) => ctr.name === rc));
      }).toBeTruthy();
    });
  });
});
