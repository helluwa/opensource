import { NestedDashboardLayout } from "~/components/layout/NestedDashboard"
import { Logo } from "~/components/mariappan-logo"
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
        <div style={{ minHeight: "5vh" }}>Dashboard</div>
        <div style={{width:150, height:75}}>
          <Logo />
        </div>
      </NestedDashboardLayout>
    </div>
  )
}
