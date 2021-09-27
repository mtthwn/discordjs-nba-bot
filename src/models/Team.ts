interface Team {
  id: number;
  abbreviation: string;
  city: string;
  conference: string,
  division: string;
  full_name: string;
  name: string;
}

export default class {
  _id: number;
  _abbreviation: string;
  _city: string;
  _conference: string;
  _division: string;
  _fullName: string;
  _name: string;

  constructor({ id, abbreviation, city, conference, division, full_name, name }: Team) {
    this._id = id;
    this._abbreviation = abbreviation;
    this._city = city;
    this._conference = conference;
    this._division = division;
    this._fullName = full_name;
    this._name = name;
  }

  get getId(): number {
    return this._id;
  }

  get getAbbreviation(): string {
    return this._abbreviation;
  }

  get getCity(): string {
    return this._city;
  }

  get getConference(): string {
    return this._conference;
  }

  get getDivision(): string {
    return this._division;
  }

  get getFullTeamName(): string {
    return this._fullName;
  }

  get getName(): string {
    return this._name;
  }
}