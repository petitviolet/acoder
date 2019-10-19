class Snippet {
  readonly id: string;
  readonly userId: string;
  readonly title: string;
  readonly fileType: string;
  readonly description: string;
  readonly content: object;
  readonly createdAt: Date;
  readonly updatedAt: Date;

  constructor(
    id: string,
    userId: string,
    title: string,
    fileType: string,
    description: string,
    content: object,
    createdAt: Date,
    updatedAt: Date,
  ) {
    this.id = id;
    this.userId = userId;
    this.title = title;
    this.fileType = fileType;
    this.description = description;
    this.content = content;
    this.createdAt = new Date(createdAt);
    this.updatedAt = new Date(updatedAt);
  }
}

export default Snippet;
