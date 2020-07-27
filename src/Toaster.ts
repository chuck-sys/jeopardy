import M from 'materialize-css';

export default class Toaster {
  public static permanentDelete() {
    M.toast({ html: 'All questions <strong>permanently</strong> deleted.' });
  }

  public static deleteOnceNotPermanent() {
    M.toast({
      html: `Questions temporarily deleted.<br>
        For permanent deletion, click the button again or create a new category.<br>
        To restore the questions, simply reload the page.`,
      displayLength: 10000,
    });
  }
}
