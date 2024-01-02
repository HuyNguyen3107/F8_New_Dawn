import image404 from "../../public/assets/images/notFound.jpg";
import "../../public/assets/scss/notFound.scss";
import Image from "next/image";
import Link from "next/link";
const NotFound = () => {
  return (
    <div className="not-found">
      <Image
        src={image404}
        alt="404 not found"
        style={{
          width: "100vw",
          height: "auto",
        }}
      />
      <h2>Lạc đường rồi. Về trang chủ ngay</h2>
      <Link href={"/"}>Quay về bờ</Link>
    </div>
  );
};

export default NotFound;
