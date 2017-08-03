import { Ng2doPage } from './app.po';

describe('ng2do App', () => {
  let page: Ng2doPage;

  beforeEach(() => {
    page = new Ng2doPage();
  });

  it('should display welcome message', () => {
    page.navigateTo();
    expect(page.getParagraphText()).toEqual('Welcome to app!');
  });
});
