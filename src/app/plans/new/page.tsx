"use client";
import {useState} from "react";
import {useRouter} from "next/navigation";
import {createPlan} from "@/services/plans";
import {getSession} from "@/services/session";

export default function NewPlanPage() {
  const router = useRouter();
  const [image, setImage] = useState("");
  const [name, setName] = useState("");
  const [address, setAddress] = useState("");
  const [estimatedPrice, setEstimatedPrice] = useState("");
  const [estimatedTime, setEstimatedTime] = useState("");
  const [description, setDescription] = useState("");
  const [recomendations, setRecomendations] = useState("");
  const [error, setError] = useState("");
  async function handleSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    setError("");
    const price = Number(estimatedPrice);
    const time = Number(estimatedTime);
    if (name.length < 2 || name.length > 50) {
      setError("El nombre debe tener entre 2 y 50 caracteres");
      return;
    }
    if (price <= 0) {
      setError("El precio debe ser mayor a 0");
      return;
    }
    if (!Number.isInteger(time)) {
      setError("La duración debe ser un número entero");
      return;
    }
    if (description.length >= 600) {
      setError("La descripción debe tener menos de 600 caracteres");
      return;
    }
    const session = getSession();
    if (!session.id) {
      setError("Debes iniciar sesión para crear un plan");
      return;
    }
    try {
      await createPlan({
        name,
        description,
        estimatedPrice: price,
        estimatedTime: time,
        recomendations,
        address,
        image,
        userId: session.id,
      });
      router.push("/plans");
    } catch (err) {
      setError("No se pudo crear el plan");
      console.log(err);
    }
  }
  return (
    <div className="flex-1 bg-slate-50 px-6 py-12">
      <div className="max-w-2xl mx-auto">
        <h1 className="text-4xl font-bold text-slate-900">Crear un nuevo plan</h1>
        <p className="text-slate-600 mt-2">Organiza invita a tus amigos para que otros miembros quieran vivir varios momentos únicos.</p>
        <form onSubmit={handleSubmit} className="bg-white border border-slate-200 rounded-xl p-8 mt-8">
          <label htmlFor="image" className="block text-sm font-semibold text-slate-700">Foto de portada del plan</label>
          <div className="border border-dashed border-slate-300 rounded-xl p-6 mt-2 text-center">
            {image ? <img src={image} alt="Vista previa del plan" className="w-full h-44 object-cover rounded-lg mb-4" /> : <p className="text-sm text-slate-500 mb-4">Haz que tu plan sea chevere a primera vista</p>}
            <input id="image" type="url" value={image} onChange={(e) => setImage(e.target.value)} placeholder="https://..." required className="w-full bg-slate-50 border border-slate-200 rounded-lg px-4 py-3 outline-none" />
          </div>
          <label htmlFor="name" className="block text-sm font-semibold text-slate-700 mt-5">Nombre del plan *</label>
          <input id="name" type="text" value={name} onChange={(e) => setName(e.target.value)} placeholder="Ej. Tarde de basketball y atardecer" required className="w-full bg-slate-50 border border-slate-200 rounded-lg px-4 py-3 mt-1 outline-none" />
          <label htmlFor="address" className="block text-sm font-semibold text-slate-700 mt-5">Dirección *</label>
          <input id="address" type="text" value={address} onChange={(e) => setAddress(e.target.value)} placeholder="Ej. San Andrés - El rodadero" required className="w-full bg-slate-50 border border-slate-200 rounded-lg px-4 py-3 mt-1 outline-none" />
          <div className="grid grid-cols-2 gap-4 mt-5">
            <div>
              <label htmlFor="price" className="block text-sm font-semibold text-slate-700">Precio estimado *</label>
              <input id="price" type="number" value={estimatedPrice} onChange={(e) => setEstimatedPrice(e.target.value)} placeholder="Ej. 30000" required className="w-full bg-slate-50 border border-slate-200 rounded-lg px-4 py-3 mt-1 outline-none" />
            </div>
            <div>
              <label htmlFor="time" className="block text-sm font-semibold text-slate-700">Duración (minutos) *</label>
              <input id="time" type="number" value={estimatedTime} onChange={(e) => setEstimatedTime(e.target.value)} placeholder="Ej. 60" required className="w-full bg-slate-50 border border-slate-200 rounded-lg px-4 py-3 mt-1 outline-none" />
            </div>
          </div>
          <div className="flex justify-between items-center mt-5">
            <label htmlFor="description" className="text-sm font-semibold text-slate-700">Descripción del plan *</label>
            <span className="text-xs text-slate-500">{description.length} / 600</span>
          </div>
          <textarea id="description" value={description} onChange={(e) => setDescription(e.target.value)} placeholder="Cuéntale a todos de qué va el plan, cuál es la vibra del grupo, el itinerario aproximado y qué lo hace especial..." required className="w-full h-28 bg-slate-50 border border-slate-200 rounded-lg px-4 py-3 mt-1 outline-none resize-none" />
          <label htmlFor="recomendations" className="block text-sm font-semibold text-slate-700 mt-5">Recomendaciones para los que vayan</label>
          <p className="text-xs text-slate-500 mt-1">Agrega tips  como vestimenta recomendada, qué llevar.</p>
          <input id="recomendations" type="text" value={recomendations} onChange={(e) => setRecomendations(e.target.value)} placeholder="Ej. Llevar protector solar, toalla y agua" className="w-full bg-slate-50 border border-slate-200 rounded-lg px-4 py-3 mt-2 outline-none" />
          {error && <p className="text-sm text-red-600 mt-4">{error}</p>}
          <div className="flex justify-end gap-3 mt-8">
            <button type="button" onClick={() => router.push("/plans")} className="bg-slate-200 text-slate-700 font-semibold rounded-lg px-6 py-3">Cancelar</button>
            <button type="submit" className="bg-blue-600 text-white font-semibold rounded-lg px-6 py-3">Publicar plan</button>
          </div>
        </form>
      </div>
    </div>
  );
}