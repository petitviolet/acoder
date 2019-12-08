import User from './User';

class Snippet {
  readonly id: string;
  readonly userId: string;
  readonly title: string;
  readonly fileType: string;
  readonly description: string;
  readonly content: string;
  readonly createdAt: Date;
  readonly updatedAt: Date;

  constructor(
    id: string,
    userId: string,
    title: string,
    fileType: string,
    description: string,
    content: string,
    createdAt: string | Date,
    updatedAt: string | Date,
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

  static fromJson(json: {
    id: string;
    userId: string;
    title: string;
    fileType: string;
    description: string;
    content: string;
    createdAt: string | Date;
    updatedAt: string | Date;
  }) {
    return new Snippet(
      json.id,
      json.userId,
      json.title,
      json.fileType,
      json.description,
      json.content,
      json.createdAt,
      json.updatedAt,
    );
  }

  static create(user: User): Snippet {
    return new Snippet(null, user.id, '', '', '', '', null, null);
  }
}

export default Snippet;
