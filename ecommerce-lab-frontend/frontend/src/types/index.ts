export interface Country {
    id: number;
    name: string;
    continent: string;
}
export interface Author {
    id: number;
    name: string;
    surname: string;
    country: Country;
}
export interface Book {
    id: number;
    name: string;
    bookCategory: string;
    authorDto: Author;
    state: string;
    availableCopies: number;
}

export interface AuthResponse {
    token: string;
    role: string;
    username: string;
}

export interface LoginPayload {
    username: string;
    password: string;
}

export interface RegisterPayload {
    username: string;
    password: string;
}

export interface BookPayload {
    name: string;
    bookCategory: string;
    authorId: number;
    bookState: string;
    copies: number;
}

export interface AuthorPayload {
    name: string;
    surname: string;
    countryId: number;
}

export interface CountryPayload {
    name: string;
    continent: string;
}

export type ViewMode = 'grid' | 'column';

export interface UserPreference {
    booksViewMode: ViewMode;
}
