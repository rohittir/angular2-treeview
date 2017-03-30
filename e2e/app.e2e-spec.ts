import { Ng2TreePage } from './app.po';

describe('ng2-tree App', function() {
  let page: Ng2TreePage;

  beforeEach(() => {
    page = new Ng2TreePage();
  });

  it('should display message saying app works', () => {
    page.navigateTo();
    expect(page.getParagraphText()).toEqual('app works!');
  });
});
