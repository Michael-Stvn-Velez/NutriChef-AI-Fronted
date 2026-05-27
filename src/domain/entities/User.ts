export type UserProps = {
  id: string
  name: string
  email: string
  createdAt: Date
}

export type UserApiData = {
  id: string
  name: string
  email: string
  createdAt: string | Date
}

export class User {
  readonly id: string
  readonly name: string
  readonly email: string
  readonly createdAt: Date

  constructor(params: UserProps) {
    this.id = params.id
    this.name = params.name
    this.email = params.email
    this.createdAt = params.createdAt
  }

  static fromApi(data: UserApiData): User {
    return new User({
      id: data.id,
      name: data.name,
      email: data.email,
      createdAt:
        data.createdAt instanceof Date ? data.createdAt : new Date(data.createdAt),
    })
  }
}
