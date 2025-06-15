interface iUser {
    id?: string,
    name: string,
    email: string,
    password: string
}


interface iCreateUser {
    name: string,
    email: string,
    password: string
}

interface iLoginUser {
    email: string,
    password: string
}