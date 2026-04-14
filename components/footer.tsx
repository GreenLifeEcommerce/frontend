
/**
 * Footer component.
 *
 * This component renders the footer of the application.
 *
 * @returns {JSX.Element}
 */
function Footer() {
  return (
    <footer className="border-t py-6">
      {/* Footer text */}
      <p className="text-center text-sm leading-loose text-muted-foreground">
        {/* Copyright symbol */}
        &copy; 2026 Green Life. All rights reserved.
      </p>
    </footer>
  );
};

export default Footer;