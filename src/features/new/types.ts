export interface Member {
  id: string;
  name: string;
}

export interface GroupFormData {
  groupName: string;
  members: Member[];
}
