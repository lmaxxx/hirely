import TemplateField from "@/features/template/components/template-field.tsx";

export type Field = {
  id: number;
  created_at: string; // ISO date string
  modified_at: string; // ISO date string
  type: "text" | "number" | "date" | "email" | "checkbox" | "textarea" | "link" | "file";
  name: string;
  label: string;
  required: boolean;
  order: number;
  application: number;
  placeholder: string;
};

const mockData: Field[] = [
  {
    "id": 1,
    "created_at": "2023-11-15T14:45:12.000Z",
    "modified_at": "2023-12-01T09:30:45.000Z",
    "type": "text",
    "name": "username",
    "label": "Enter your username:",
    "required": true,
    "order": 34,
    "application": 563,
    "placeholder": "e.g. johndoe"
  },
  {
    "id": 2,
    "created_at": "2021-05-20T08:22:14.000Z",
    "modified_at": "2023-03-10T12:50:33.000Z",
    "type": "link",
    "name": "emailll",
    "label": "Enter your email:",
    "required": false,
    "order": 78,
    "application": 342,
    "placeholder": "e.g. johndoe@example.com"
  },
  {
    "id": 6,
    "created_at": "2022-04-10T11:30:45.000Z",
    "modified_at": "2023-08-15T14:20:10.000Z",
    "type": "textarea",
    "name": "birthdate",
    "label": "Enter your birthdate",
    "required": true,
    "order": 42,
    "application": 102,
    "placeholder": "e.g. 01-01-2000"
  },
  {
    "id": 7,
    "created_at": "2020-09-21T08:15:30.000Z",
    "modified_at": "2024-01-02T10:50:25.000Z",
    "type": "checkbox",
    "name": "password",
    "label": "Enter your password",
    "required": true,
    "order": 11,
    "application": 678,
    "placeholder": "e.g. securePassword123"
  },
  {
    "id": 8,
    "created_at": "2023-03-12T07:45:00.000Z",
    "modified_at": "2023-11-29T16:30:00.000Z",
    "type": "file",
    "name": "CV",
    "label": "CV",
    "required": true,
    "order": 65,
    "application": 875,
    "placeholder": "e.g. +123456789"
  },
  {
    "id": 8,
    "created_at": "2023-03-12T07:45:00.000Z",
    "modified_at": "2023-11-29T16:30:00.000Z",
    "type": "number",
    "name": "phone",
    "label": "Enter your phone number",
    "required": false,
    "order": 65,
    "application": 875,
    "placeholder": "e.g. +123456789"
  }
]

export default function TemplateStructure() {
  return (
    <div className={"w-full grid place-items-center h-full p-3 bg-[#F5F5F5]"}>
      <div className={"max-w-xl w-full flex gap-3.5 flex-col"}>
        {
          mockData.map((field) => (
            <TemplateField field={field}/>
          ))
        }
      </div>
    </div>
  )
}