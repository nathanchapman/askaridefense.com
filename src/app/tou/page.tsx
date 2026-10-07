import { LegalPage } from "@/components/legal-page"
import data from "@/data/tou.json"

export const metadata = { title: "Terms of Use" }
export default function Terms() {
  return <LegalPage title="Terms of Use" data={data} />
}
