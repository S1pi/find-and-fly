type AvatarProps = {
  username: string;
  profilePicture?: string | null;
  size?: number;
  className?: string;
};

const randomColorGenerator = () => {
  const colors = [
    'ef4444', // red
    'f97316', // orange
    'f59e0b', // amber
    'eab308', // yellow
    '84cc16', // lime
    '22c55e', // green
    '10b981', // emerald
    '14b8a6', // teal
    '06b6d4', // cyan
    '0ea5e9', // sky
    '3b82f6', // blue
    '6366f1', // indigo
    '8b5cf6', // violet
    'a855f7', // purple
    'd946ef', // fuchsia
    'ec4899', // pink
    'f43f5e', // rose
    'fb7185', // light rose
    'f472b6', // light pink
    'c084fc', // light violet
    '818cf8', // light indigo
    '60a5fa', // light blue
    '38bdf8', // light sky
    '22d3ee', // light cyan
    '2dd4bf', // light teal
    '34d399', // light emerald
    '4ade80', // light green
    'a3e635', // light lime
    'facc15', // light yellow
    'fb923c', // light orange
  ];
  return colors[Math.floor(Math.random() * colors.length)];
};

const Avatar = ({
  username,
  profilePicture,
  size = 40,
  className = '',
}: AvatarProps) => {
  const placeholderUrl = `https://api.dicebear.com/8.x/initials/svg?seed=${encodeURIComponent(
    username,
  )}&backgroundColor=${randomColorGenerator()}`;

  return (
    <img
      src={profilePicture || placeholderUrl}
      alt={`Avatar for ${username}`}
      className={`rounded-full object-cover ${className}`}
      style={{width: size, height: size}}
    />
  );
};

export default Avatar;
