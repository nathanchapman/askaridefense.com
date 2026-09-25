import { LegalPage } from "@/components/legal-page"
import data from "@/data/privacy.json"

export const metadata = { title: "Website User Agreement & Disclaimers" }
export default function Privacy() {
  return (
    <LegalPage
      title="Website User Agreement & Disclaimers"
      data={data}
      numbered
    />
  )
}
