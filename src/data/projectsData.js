// Этот файл теперь загружает данные из JSON файла
// Данные автоматически обновляются через админ-панель

let projectsData = []

// Загрузка данных из JSON файла
const loadProjectsData = async () => {
  try {
    const response = await fetch('/projects.json')
    projectsData = await response.json()
    return projectsData
  } catch (error) {
    console.error('Ошибка загрузки данных проектов:', error)
    return []
  }
}

// Инициализация данных
loadProjectsData()

export { projectsData }
