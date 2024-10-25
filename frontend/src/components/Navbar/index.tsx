"use client";

import axios from "axios";
import Cookies from "js-cookie";
import jwt from "jsonwebtoken";
import { usePathname, useRouter } from "next/navigation";
import { useEffect, useState } from "react";
import { toast, ToastContainer } from "react-toastify";
import Modal from "../Modal/modal";
import { User } from "./types";

const BASE_URL = process.env.NEXT_PUBLIC_BASE_URL;

export default function Navbar() {
  const [isUserModalOpen, setUserModalOpen] = useState(false);
  const [isMovieModalOpen, setMovieModalOpen] = useState(false);
  const [isUserListModalOpen, setUserListModalOpen] = useState(false);
  const [actors, setActors] = useState<string[]>([]);
  const [actorInput, setActorInput] = useState("");
  const [imageUrl, setImageUrl] = useState("");
  const [title, setTitle] = useState("");
  const [gender, setGender] = useState("");
  const [director, setDirector] = useState("");
  const [users, setUsers] = useState<User[]>([]);
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [role, setRole] = useState("user");
  const router = useRouter();
  const pathname = usePathname();

  const token = Cookies.get("token");

  useEffect(() => {
    if (!token) {
      router.push("/login");
    }
  }, [token, router]);

  const decodedToken = token
    ? (jwt.decode(token) as jwt.JwtPayload | null)
    : null;
  const userRole = (decodedToken?.role as string) || null;

  if (pathname === "/login") {
    return null;
  }

  const toggleUserModal = () => setUserModalOpen(!isUserModalOpen);
  const toggleMovieModal = () => setMovieModalOpen(!isMovieModalOpen);
  const toggleUserListModal = () => setUserListModalOpen(!isUserListModalOpen);

  const addActor = () => {
    if (actorInput) {
      setActors([...actors, actorInput]);
      setActorInput("");
    }
  };

  const removeActor = (index: number) => {
    const newActors = actors.filter((_, i) => i !== index);
    setActors(newActors);
  };

  const handleLogout = () => {
    Cookies.remove("token");
    toast.success("Logout realizado com sucesso!");
    router.push("/login");
  };

  const handlerToggleUserListModal = async () => {
    try {
      const token = Cookies.get("token");
      const response = await axios.get(`${BASE_URL}/users`, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });

      setUsers(response.data);
      toggleUserListModal();
      toast.success("Lista de usuários carregada com sucesso!");
    } catch (error) {
      toast.error("Erro ao buscar usuários");
      console.log("Erro ao buscar usuarios:", error);
    }
  };

  const handlerDeactivateUser = async (userId: string) => {
    try {
      const token = Cookies.get("token");
      await axios.patch(
        `${BASE_URL}/users/${userId}/deactivate`,
        {},
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );

      const response = await axios.get(`${BASE_URL}/users`, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });

      setUsers(response.data);
      toast.success("Usuário desativado com sucesso!");
    } catch (error) {
      toast.error("Erro ao desativar usuário");
      console.log("Erro ao desativar usuário:", error);
    }
  };

  const handlerActivateUser = async (userId: string) => {
    try {
      const token = Cookies.get("token");
      await axios.patch(
        `${BASE_URL}/users/${userId}/activate`,
        {},
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );
      const response = await axios.get(`${BASE_URL}/users`, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });

      setUsers(response.data);
      toast.success("Usuário ativado com sucesso!");
    } catch (error) {
      toast.error("Erro ao ativar usuário");
      console.log("Erro ao ativar usuário:", error);
    }
  };

  const handleUserCreation = async (e: React.FormEvent) => {
    e.preventDefault();

    const token = Cookies.get("token");
    try {
      const response = await axios.post(
        `${BASE_URL}/users`,
        {
          username,
          password,
          role,
        },
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );

      if (response.status === 201) {
        setUsername("");
        setPassword("");
        setRole("user");
        toggleUserModal();
        toast.success("Usuário criado com sucesso!");
      } else {
        toast.error("Erro ao criar usuário");
        console.error("Erro ao criar usuário");
      }
    } catch (error) {
      toast.error("Erro na requisição");
      console.error("Erro na requisição", error);
    }
  };

  const handleMovieCreation = async (e: React.FormEvent) => {
    e.preventDefault();

    const token = Cookies.get("token");
    try {
      const response = await axios.post(
        `${BASE_URL}/movies`,
        {
          imageUrl,
          title,
          director,
          gender,
          actors,
        },
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );

      if (response.status === 201) {
        setUsername("");
        setPassword("");
        setRole("user");
        toggleMovieModal();
        toast.success("Filme cadastrado com sucesso!");
      } else {
        toast.error("Erro ao criar filme.");
        console.error("Erro ao criar filme.");
      }
    } catch (error) {
      toast.error("Erro na requisição");
      console.error("Erro na requisição", error);
    }
  };
  return (
    <nav className="bg-[#0f172a] py-[12px] px-[3%]">
      <ul className="flex space-x-4">
        <li>
          <button onClick={() => router.push("/movies")} className="text-white">
            Filmes
          </button>
        </li>

        {userRole && userRole === "admin" && (
          <>
            <li>
              <button onClick={toggleUserModal} className="text-white">
                Cadastrar Usuário
              </button>
            </li>
            <li>
              <button
                onClick={handlerToggleUserListModal}
                className="text-white"
              >
                Ativar/Desativar Usuário
              </button>
            </li>
            <li>
              <button onClick={toggleMovieModal} className="text-white">
                Cadastrar Filme
              </button>
            </li>
          </>
        )}

        {pathname === "/external" ? (
          <li>
            <button
              onClick={() => router.push("/movies")}
              className="text-white"
            >
              Módulo Interno
            </button>
          </li>
        ) : (
          <li>
            <button
              onClick={() => router.push("/external")}
              className="text-white"
            >
              Módulo Externo
            </button>
          </li>
        )}
        <li className="ml-auto">
          <button onClick={handleLogout} className="text-red-500">
            Logout
          </button>
        </li>
      </ul>

      <Modal isOpen={isUserListModalOpen} onClose={toggleUserListModal}>
        <div className="flex justify-between items-center">
          <h2>Lista de Usuários</h2>
          <button onClick={toggleUserListModal} className="text-red-500">
            X
          </button>
        </div>
        <div className="mt-4">
          <table className="min-w-full border">
            <thead>
              <tr>
                <th className="border p-2">Username</th>
                <th className="border p-2">Status</th>
                <th className="border p-2">Ações</th>
              </tr>
            </thead>
            <tbody>
              {users.map((user) => (
                <tr key={user.id}>
                  <td className="border p-2">{user.username}</td>
                  <td className="border p-2">
                    {user.isActive ? "Ativo" : "Inativo"}
                  </td>
                  <td className="border p-2">
                    <button
                      onClick={() =>
                        user.isActive
                          ? handlerDeactivateUser(user.id)
                          : handlerActivateUser(user.id)
                      }
                      className={`text-white p-2 rounded ${
                        user.isActive ? "bg-red-500" : "bg-green-500"
                      }`}
                    >
                      {user.isActive ? "Desativar" : "Ativar"}
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </Modal>

      <Modal isOpen={isUserModalOpen} onClose={toggleUserModal}>
        <div className="flex justify-between items-center">
          <h2>Criar Novo Usuário</h2>
          <button onClick={toggleUserModal} className="text-red-500">
            X
          </button>
        </div>
        <form onSubmit={handleUserCreation}>
          <div className="flex flex-col space-y-2">
            <input
              type="text"
              placeholder="Username"
              className="border p-2"
              value={username}
              onChange={(e) => setUsername(e.target.value)}
            />
            <input
              type="password"
              placeholder="Password"
              className="border p-2"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
            />
            <select
              className="border p-2"
              value={role}
              onChange={(e) => setRole(e.target.value)}
            >
              <option value="user">User</option>
              <option value="admin">Admin</option>
            </select>
            <button
              type="submit"
              className="bg-blue-500 text-white p-2 rounded"
            >
              Criar
            </button>
          </div>
        </form>
      </Modal>

      <Modal isOpen={isMovieModalOpen} onClose={toggleMovieModal}>
        <div className="flex justify-between items-center">
          <h2>Criar Novo Filme</h2>
          <button onClick={toggleMovieModal} className="text-red-500">
            X
          </button>
        </div>
        <form onSubmit={handleMovieCreation}>
          <div className="flex flex-col space-y-2">
            <input
              type="text"
              placeholder="URL da Imagem"
              value={imageUrl}
              onChange={(e) => setImageUrl(e.target.value)}
              className="border p-2"
            />
            <input
              type="text"
              placeholder="Título do Filme"
              className="border p-2"
              value={title}
              onChange={(e) => setTitle(e.target.value)}
            />
            <input
              type="text"
              placeholder="Gênero"
              className="border p-2"
              value={gender}
              onChange={(e) => setGender(e.target.value)}
            />
            <input
              type="text"
              placeholder="Diretor"
              className="border p-2"
              value={director}
              onChange={(e) => setDirector(e.target.value)}
            />

            <div className="flex flex-col space-y-2">
              <div className="flex">
                <input
                  type="text"
                  placeholder="Ator"
                  value={actorInput}
                  onChange={(e) => setActorInput(e.target.value)}
                  className="border p-2 flex-grow"
                />
                <button
                  type="button"
                  onClick={addActor}
                  className="bg-blue-500 text-white p-2"
                >
                  Adicionar Ator
                </button>
              </div>
              <ul>
                {actors.map((actor, index) => (
                  <li key={index} className="flex justify-between">
                    {actor}
                    <button
                      type="button"
                      onClick={() => removeActor(index)}
                      className="text-red-500"
                    >
                      Remover
                    </button>
                  </li>
                ))}
              </ul>
            </div>

            <button
              type="submit"
              className="bg-blue-500 text-white p-2 rounded"
            >
              Cadastrar Filme
            </button>
          </div>
        </form>
      </Modal>
      <ToastContainer />
    </nav>
  );
}
