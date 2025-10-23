import Link from "next/link";
import Image from "next/image";
import NavItems from "@/components/Navitems";
import UserDropdown from "@/components/UserDropdown";
import {searchStocks} from "@/lib/actions/finhub.actions";

const Header = async ({ user }: { user: User }) => {
    const initialStocks = await searchStocks();

    return (
        <header className="sticky top-0 header">
            <div className="container header-wrapper">
                <Link href="/">
                    <Image src="/assets/images/logo1.png" alt="TradeEdge logo" width={80} height={80} className="h-15 w-80 cursor-pointer" />
                </Link>
                <nav className="hidden sm:block">
                    <NavItems initialStocks={initialStocks} />
                </nav>

                <UserDropdown user={user} initialStocks={initialStocks} />
            </div>
        </header>
    )
}
export default Header