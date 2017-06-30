import { AuthAppPage } from './app.po';

describe('auth-app App', () => {
  let page: AuthAppPage;

  beforeEach(() => {
    page = new AuthAppPage();
  });

  it('should display welcome message', () => {
    page.navigateTo();
    expect(page.getParagraphText()).toEqual('Welcome to app!!');
  });
});
