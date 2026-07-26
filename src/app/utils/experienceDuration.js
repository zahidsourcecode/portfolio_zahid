const MONTH_NAMES = [
  "Jan",
  "Feb",
  "Mar",
  "Apr",
  "May",
  "Jun",
  "Jul",
  "Aug",
  "Sep",
  "Oct",
  "Nov",
  "Dec",
];

const MONTH_MAP = Object.fromEntries(MONTH_NAMES.map((name, index) => [name, index]));

function parseMonthName(name) {
  const normalized = name.trim().slice(0, 3);
  const capitalized = normalized.charAt(0).toUpperCase() + normalized.slice(1).toLowerCase();
  const month = MONTH_MAP[capitalized];

  if (month === undefined) {
    throw new Error(`Invalid experience date month: ${name}`);
  }

  return month;
}

function lastDayOfMonth(year, month) {
  return new Date(year, month + 1, 0).getDate();
}

function parseExperienceDate(str, now = new Date()) {
  if (!str || str.toLowerCase() === "present") {
    return {
      year: now.getFullYear(),
      month: now.getMonth(),
      day: now.getDate(),
      isPresent: true,
      hasDay: true,
      label: "Present",
    };
  }

  const value = str.trim();

  let match = value.match(/^(\d{1,2})\s+([A-Za-z]+)\s+(\d{4})$/);
  if (match) {
    const day = parseInt(match[1], 10);
    const month = parseMonthName(match[2]);
    const year = parseInt(match[3], 10);

    return {
      year,
      month,
      day,
      isPresent: false,
      hasDay: true,
      label: `${day} ${MONTH_NAMES[month]} ${year}`,
    };
  }

  match = value.match(/^([A-Za-z]+)\s+(\d{1,2}),?\s+(\d{4})$/);
  if (match) {
    const month = parseMonthName(match[1]);
    const day = parseInt(match[2], 10);
    const year = parseInt(match[3], 10);

    return {
      year,
      month,
      day,
      isPresent: false,
      hasDay: true,
      label: `${day} ${MONTH_NAMES[month]} ${year}`,
    };
  }

  match = value.match(/^([A-Za-z]+)\s+(\d{4})$/);
  if (match) {
    const month = parseMonthName(match[1]);
    const year = parseInt(match[2], 10);

    return {
      year,
      month,
      day: null,
      isPresent: false,
      hasDay: false,
      label: `${MONTH_NAMES[month]} ${year}`,
    };
  }

  throw new Error(`Invalid experience date: ${str}`);
}

function monthIndex({ year, month }) {
  return year * 12 + month;
}

function isPresent(endStr) {
  return !endStr || endStr.toLowerCase() === "present";
}

function resolveBoundaryDay(date, boundary) {
  if (date.hasDay) {
    return date.day;
  }

  return boundary === "start" ? 1 : lastDayOfMonth(date.year, date.month);
}

function monthsBetween(startStr, endStr, now = new Date()) {
  const start = parseExperienceDate(startStr, now);
  const end = parseExperienceDate(endStr, now);

  if (end.isPresent || (start.hasDay && end.hasDay)) {
    const startDay = resolveBoundaryDay(start, "start");
    const endDay = end.isPresent ? end.day : resolveBoundaryDay(end, "end");

    let years = end.year - start.year;
    let months = end.month - start.month;

    if (endDay < startDay) {
      months -= 1;
    }

    if (months < 0) {
      years -= 1;
      months += 12;
    }

    return years * 12 + months;
  }

  return (end.year - start.year) * 12 + (end.month - start.month) + 1;
}

function getCompanyDateRange(roles) {
  if (!roles?.length) {
    throw new Error("At least one role is required to calculate a date range.");
  }

  let start = roles[0].start;
  let end = roles[0].end;

  for (const role of roles) {
    if (monthIndex(parseExperienceDate(role.start)) < monthIndex(parseExperienceDate(start))) {
      start = role.start;
    }

    if (isPresent(role.end)) {
      end = "Present";
    } else if (!isPresent(end) && monthIndex(parseExperienceDate(role.end)) > monthIndex(parseExperienceDate(end))) {
      end = role.end;
    }
  }

  return { start, end };
}

function formatDurationMonths(totalMonths) {
  if (totalMonths <= 0) return "0 mos";

  if (totalMonths < 12) {
    return `${totalMonths} mos`;
  }

  const years = Math.floor(totalMonths / 12);
  const months = totalMonths % 12;
  const yrLabel = years === 1 ? "yr" : "yrs";

  if (months === 0) {
    return `${years} ${yrLabel}`;
  }

  return `${years} ${yrLabel} ${months} mos`;
}

export function formatExperienceRange(startStr, endStr, now = new Date()) {
  const start = parseExperienceDate(startStr, now);
  const end = parseExperienceDate(endStr, now);
  const duration = formatDurationMonths(monthsBetween(startStr, endStr, now));

  return `${start.label} – ${end.label} · ${duration}`;
}

export function formatEmploymentType(roles, employmentType = "Full-time", now = new Date()) {
  const { start, end } = getCompanyDateRange(roles);
  return `${employmentType} · ${formatDurationMonths(monthsBetween(start, end, now))}`;
}

function toCareerStartDateTime(startStr, now = new Date()) {
  const parsed = parseExperienceDate(startStr, now);
  const day = resolveBoundaryDay(parsed, "start");
  return new Date(parsed.year, parsed.month, day, 0, 0, 0, 0);
}

function toCareerEndDateTime(endStr, now = new Date()) {
  const parsed = parseExperienceDate(endStr, now);
  if (parsed.isPresent) {
    return new Date(now.getTime());
  }

  const day = resolveBoundaryDay(parsed, "end");
  return new Date(parsed.year, parsed.month, day, 23, 59, 59, 999);
}

export function getCareerStartLabel(roles, now = new Date()) {
  const { start } = getCompanyDateRange(roles);
  return parseExperienceDate(start, now).label;
}

export function getCareerDurationParts(rolesOrStart, endStr = "Present", now = new Date()) {
  const range = typeof rolesOrStart === "string"
    ? { start: rolesOrStart, end: endStr }
    : getCompanyDateRange(rolesOrStart);

  const startDate = toCareerStartDateTime(range.start, now);
  const endDate = toCareerEndDateTime(range.end, now);

  let years = endDate.getFullYear() - startDate.getFullYear();
  let months = endDate.getMonth() - startDate.getMonth();
  let days = endDate.getDate() - startDate.getDate();

  if (days < 0) {
    months -= 1;
    days += lastDayOfMonth(endDate.getFullYear(), endDate.getMonth() - 1);
  }

  if (months < 0) {
    years -= 1;
    months += 12;
  }

  const anchor = new Date(startDate);
  anchor.setFullYear(anchor.getFullYear() + years);
  anchor.setMonth(anchor.getMonth() + months);
  anchor.setDate(anchor.getDate() + days);

  const remainderMs = Math.max(0, endDate.getTime() - anchor.getTime());
  const hours = Math.floor(remainderMs / 3600000);
  const minutes = Math.floor((remainderMs % 3600000) / 60000);
  const seconds = Math.floor((remainderMs % 60000) / 1000);

  return {
    years,
    months,
    days,
    hours,
    minutes,
    seconds,
  };
}
