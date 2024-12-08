import { Button } from "@/components/ui/button";
import Image from "next/image";
import Search from "@/components/Search";
import FileUpload from "@/components/FileUpload";
import { signOutUser } from "@/lib/actions/user.actions";

interface Props {
  $id: string;
  accountId: string;
}

const Header = ({ $id: ownerId, accountId }: Props) => {
  const handleSignOut = async () => {
    "use server";
    await signOutUser();
  };

  return (
    <header className="header">
      <Search />
      <div className="header-wrapper">
        <FileUpload ownerId={ownerId} accountId={accountId} />
        <form action={handleSignOut}>
          <Button type="submit" className="sign-out-button">
            <Image
              src="/assets/icons/logout.svg"
              alt="logout"
              width={24}
              height={24}
              className="w-6"
            />
          </Button>
        </form>
      </div>
    </header>
  );
};

export default Header;
