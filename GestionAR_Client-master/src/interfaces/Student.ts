import { Person } from './Person';

export interface Student extends Person {
  grade_id: any;
  integrated: boolean;
  entry_date: Date;
  egress_date: Date;
  registration_number: number;
  previous_school: string;
  neighborhood: string;
  cooperator: boolean;
  school_radio: boolean;
  disability_type?: string;
  medical_center: string;
  school_dining?: boolean;
  milk_cup?: boolean;
  repeating_quantity: number;
  student_tutors: any[];
}
