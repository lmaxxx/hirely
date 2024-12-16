import {PropsWithChildren} from "react";

type Props = {
  title: string,
}

export default function SectionHeader({title, children}: PropsWithChildren<Props>) {
  return (
    <div className={"border-b p-3 flex items-center justify-between gap-2"}>
      <h1 className={"text-2xl"}>{title}</h1>
      {children}
    </div>
  )
}