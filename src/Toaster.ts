import M from 'materialize-css';

export default class Toaster {
  private static short(html: string) {
    M.toast({
      html: `<p>${html}</p>`,
      displayLength: 2000,
    });
  }

  public static permanentDelete() {
    Toaster.short('All questions <strong>permanently</strong> deleted.');
  }

  public static deleteOnceNotPermanent() {
    M.toast({
      html: `<p>Questions temporarily deleted.<br>
        For permanent deletion, click the button again or create a new category.<br>
        To restore the questions, simply reload the page.</p>`,
      displayLength: 10000,
    });
  }

  public static deleteQuestion() {
    Toaster.short('Question deleted successfully.');
  }

  public static deleteCategory(cat: string) {
    M.toast({ html: `<p>'${cat}' deleted successfully.<br>Questions within '${cat}' deleted.</p>` });
  }

  public static updateQuestion() {
    Toaster.short('Question updated successfully.');
  }

  public static updateCategory() {
    Toaster.short('Category renamed successfully.');
  }

  public static uploadFile() {
    Toaster.short('Contents of file read successfully.');
  }

  public static resetAllQuestions() {
    Toaster.short('All questions\' statuses are reset.');
  }

  public static resetAllTeamScores() {
    Toaster.short('All teams\' scores reset to zero (0).');
  }

  public static categoryExists(cat: string) {
    M.toast({
      html: `<p><strong>'${cat}' already exists</strong></br>
        Consider renaming the column (e.g. adding a number).</p>`,
      displayLength: 5000,
    });
  }
}
