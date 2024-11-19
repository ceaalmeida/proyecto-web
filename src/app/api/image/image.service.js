class AnimalImageAPI {

  async uploadImage(id, imageFile) {
    const formData = new FormData();
    formData.append("image", imageFile);
    console.log(formData);

    const response = await fetch(`${process.env.NEXT_PUBLIC_BACKEND_URL}/Animal/${id}/image`, {
      method: "POST",
      body: formData,
    });

    return response.json();
  }

  async getImage(id) {
    const response = await fetch(`${process.env.NEXT_PUBLIC_BACKEND_URL}/Animal/${id}/image`, {
      method: "GET",
    });

    if (!response.ok) {
      throw new Error("Error al obtener la imagen");
    }

    return response.blob();
  }

  async deleteImage(id) {
    const response = await fetch(`${process.env.NEXT_PUBLIC_BACKEND_URL }/Animal/${id}/image`, {
      method: "DELETE",
    });

    return response.json();
  }
}

export default AnimalImageAPI;
