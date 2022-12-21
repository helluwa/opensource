import { NestedDashboardLayout } from "~/components/layout/NestedDashboard"
import { navItems } from "~/data/navitems"

export default function Index() {
  return (
    <div style={{ fontFamily: "system-ui, sans-serif", lineHeight: "1.4" }}>
      <NestedDashboardLayout
        navData={navItems}
        userButtonData={{
          fullname: "Karthikeyan Mariappan",
          email: "karthikeyanmariappan@mariappan.de",
        }}
      >
        <div style={{ minHeight: "30vh" }}>Settings</div>
      </NestedDashboardLayout>
    </div>
  )
}
