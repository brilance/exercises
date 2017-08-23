import { SeptaClientPage } from './app.po';

describe('septa-client App', () => {
  let page: SeptaClientPage;

  beforeEach(() => {
    page = new SeptaClientPage();
  });

  it('should display welcome message', () => {
    page.navigateTo();
    expect(page.getParagraphText()).toEqual('Welcome to app!');
  });
});
