class Snippet {
  readonly id: string;
  readonly userId: string;
  readonly title: string;
  readonly fileType: string;
  readonly description: string;
  readonly content: object;

  constructor(
    id: string,
    userId: string,
    title: string,
    fileType: string,
    description: string,
    content: object
  ) {
    this.id = id;
    this.userId = userId;
    this.title = title;
    this.fileType = fileType;
    this.description = description;
    this.content = content;
  }
}

export default Snippet;
