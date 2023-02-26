import api from "../utils/api";

export async function register(createProject) {

  try {
    const data = await api.post("/api/projects", createProject).then((response) => {
      return response.data;
    });
  } catch (error) {
    // tratar erro
    console.log(error);
  }
}
