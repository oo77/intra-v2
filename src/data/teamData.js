// Этот файл теперь загружает данные из JSON файла
// Данные автоматически обновляются через админ-панель

let teamMembersData = {};

// Загрузка данных из JSON файла
const loadTeamData = async () => {
  try {
    const response = await fetch('/team-members.json');
    teamMembersData = await response.json();
    return teamMembersData;
  } catch (error) {
    console.error('Ошибка загрузки данных команды:', error);
    return {};
  }
};

// Инициализация данных
loadTeamData();

export { teamMembersData };

export const getTeamMembersByLanguage = (language) => {
  const members = [];
  Object.keys(teamMembersData).forEach(key => {
    const member = teamMembersData[key];
    members.push({
      id: member.id,
      image: member.image,
      email: member.email,
      phone: member.phone,
      ...member[language]
    });
  });
  return members;
};

export const getTeamMemberById = (id, language) => {
  const member = teamMembersData[id];
  if (!member) return null;

  return {
    id: member.id,
    image: member.image,
    email: member.email,
    phone: member.phone,
    ...member[language]
  };
};
