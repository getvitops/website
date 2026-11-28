/**
 * Motion classes that content (seed `className` fields) uses but no source file does. Tailwind only
 * emits a utility it finds in scanned source, and it does not scan the CMS, so list them here.
 * Not imported anywhere: the file exists to be scanned. Keep it to the framework's animation
 * engine classes (see `vitops docs classes`, "Animation").
 */
export const motionClasses = 'fade-in slide-up animate-view stagger';
