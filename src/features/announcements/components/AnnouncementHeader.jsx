import HeroBgSection from "../../../components/HeroBgSection";

const announcementHeroImage =
  "https://media.istockphoto.com/id/2189054299/photo/red-and-white-megaphone-on-a-pure-red-background-illustration-of-the-concept-of-freedom-of.jpg?s=612x612&w=0&k=20&c=7U1LEKToRnI5GDGRxv4xRYsD1Bzg8380OKLUhzAdplE=";

export default function AnnouncementHeader() {
  return (
    <>
      <HeroBgSection img={announcementHeroImage} label="Announcements" />
      <div className="p-5 text-center mt-7 md:mt-14 bg-red-primary">
        <h2 className="max-w-full mx-auto text-lg font-bold leading-tight tracking-wider break-words sm:text-2xl md:text-3xl text-red-50">
          <span className="block sm:inline">IMPORTANT UPDATES</span>{" "}
          <span className="block sm:inline">&amp; NOTICES</span>
        </h2>
      </div>
    </>
  );
}
