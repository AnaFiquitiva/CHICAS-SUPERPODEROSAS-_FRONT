import { useState } from "react";
import {
    Search,
    Users,
    BookOpen,
    Clock,
    User,
    CheckCircle2,
    Circle,
    ShoppingCart,
    X,
    Trash2,
    Layers,
    ChevronLeft,
} from "lucide-react";

import { Button } from "../ui/button";
import { Input } from "../ui/input";
import { Card, CardContent } from "../ui/card";
import {
    Select,
    SelectTrigger,
    SelectValue,
    SelectContent,
    SelectItem,
} from "../ui/select";
import {
    Dialog,
    DialogContent,
    DialogHeader,
    DialogTitle,
    DialogDescription,
    DialogFooter,
} from "../ui/dialog";

// Datos simulados de materias
const materiasData = [
    {
        id: 1,
        codigo: "FISI-2101L",
        nombre: "Física II - Laboratorio",
        profesor: "Dr. Rodríguez Santos",
        creditos: 1,
        horario: "08:00 - 10:00",
        ubicacion: "Lab-205",
        semestre: "2025-1",
        estado: "disponible",
        tipo: "Laboratorio",
        modalidad: "Presencial",
    },
    {
        id: 2,
        codigo: "MAT-1102",
        nombre: "Cálculo Diferencial",
        profesor: "MSc. Gómez L.",
        creditos: 3,
        horario: "10:00 - 12:00",
        ubicacion: "Aula-302",
        semestre: "2025-1",
        estado: "inscrita",
        tipo: "Teórica",
        modalidad: "Presencial",
    },
];

// ---- Componente principal ----
export default function GestionMateriasApp({ onNavigate }) {
    const [materias] = useState(materiasData);
    const [searchQuery, setSearchQuery] = useState("");
    const [estadoFilter, setEstadoFilter] = useState("todos");
    const [semestreFilter, setSemestreFilter] = useState("todos");
    const [viewFilter, setViewFilter] = useState("todas");
    const [isGruposDialogOpen, setIsGruposDialogOpen] = useState(false);
    const [selectedMateria, setSelectedMateria] = useState(null);
    const [isCartOpen, setIsCartOpen] = useState(false);
    const [cart, setCart] = useState([]);

    // Filtrado de materias
    const filteredMaterias = materias.filter((materia) => {
        const matchesSearch =
            materia.nombre.toLowerCase().includes(searchQuery.toLowerCase()) ||
            materia.codigo.toLowerCase().includes(searchQuery.toLowerCase());
        const matchesEstado =
            estadoFilter === "todos" || materia.estado === estadoFilter;
        const matchesSemestre =
            semestreFilter === "todos" || materia.semestre === semestreFilter;
        return matchesSearch && matchesEstado && matchesSemestre;
    });

    // --- Handlers ---
    const handleVerGrupos = (materia) => {
        setSelectedMateria(materia);
        setIsGruposDialogOpen(true);
    };

    const handleAddToCart = (materia, grupo) => {
        const newItem = { ...materia, grupo };
        setCart((prev) => [...prev, newItem]);
        setIsGruposDialogOpen(false);
    };

    const handleRemoveFromCart = (materiaId) => {
        setCart((prev) => prev.filter((item) => item.id !== materiaId));
    };

    return (
        <div className="flex flex-col min-h-screen bg-gray-50">
            {/* Header institucional */}
            <InstitutionalHeader title="Gestión de Materias" onNavigate={onNavigate} />

            {/* Controles */}
            <div className="flex items-center justify-between p-4 bg-white shadow-sm">
                <div className="flex items-center gap-2">
                    <Input
                        placeholder="Buscar materia..."
                        value={searchQuery}
                        onChange={(e) => setSearchQuery(e.target.value)}
                        className="w-64"
                    />
                    <Button variant="outline">
                        <Search className="w-4 h-4 mr-1" /> Buscar
                    </Button>
                </div>

                <div className="flex gap-2">
                    <Select onValueChange={setEstadoFilter}>
                        <SelectTrigger className="w-40">
                            <SelectValue placeholder="Estado" />
                        </SelectTrigger>
                        <SelectContent>
                            <SelectItem value="todos">Todos</SelectItem>
                            <SelectItem value="disponible">Disponibles</SelectItem>
                            <SelectItem value="inscrita">Inscritas</SelectItem>
                        </SelectContent>
                    </Select>

                    <Select onValueChange={setSemestreFilter}>
                        <SelectTrigger className="w-40">
                            <SelectValue placeholder="Semestre" />
                        </SelectTrigger>
                        <SelectContent>
                            <SelectItem value="todos">Todos</SelectItem>
                            <SelectItem value="2025-1">2025-1</SelectItem>
                            <SelectItem value="2025-2">2025-2</SelectItem>
                        </SelectContent>
                    </Select>

                    <Button
                        variant="secondary"
                        onClick={() => setIsCartOpen(!isCartOpen)}
                        className="flex items-center gap-2"
                    >
                        <ShoppingCart className="w-5 h-5" />
                        <span>Carrito ({cart.length})</span>
                    </Button>
                </div>
            </div>

            {/* Lista de materias */}
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 p-6">
                {filteredMaterias.map((materia) => (
                    <Card
                        key={materia.id}
                        className="hover:shadow-lg transition-shadow cursor-pointer"
                    >
                        <CardContent className="p-4">
                            <div className="flex items-center justify-between">
                                <h2 className="text-lg font-semibold">{materia.nombre}</h2>
                                <Layers className="w-5 h-5 text-gray-500" />
                            </div>
                            <p className="text-sm text-gray-600">{materia.codigo}</p>
                            <p className="text-sm text-gray-500 mt-1">
                                Profesor: {materia.profesor}
                            </p>
                            <p className="text-sm text-gray-500">
                                Horario: {materia.horario}
                            </p>
                            <p className="text-sm text-gray-500">
                                Créditos: {materia.creditos}
                            </p>
                            <div className="flex justify-between items-center mt-3">
                                <Button size="sm" onClick={() => handleVerGrupos(materia)}>
                                    Ver grupos
                                </Button>
                                {materia.estado === "inscrita" && (
                                    <span className="text-green-600 text-sm font-medium">
                    Inscrita
                  </span>
                                )}
                            </div>
                        </CardContent>
                    </Card>
                ))}
            </div>

            {/* Dialogo de grupos */}
            <Dialog open={isGruposDialogOpen} onOpenChange={setIsGruposDialogOpen}>
                <DialogContent className="max-w-md">
                    <DialogHeader>
                        <DialogTitle>Grupos disponibles</DialogTitle>
                    </DialogHeader>
                    {selectedMateria && (
                        <div className="space-y-3">
                            <p>
                                <strong>{selectedMateria.nombre}</strong>
                            </p>
                            <Button onClick={() => handleAddToCart(selectedMateria, "Grupo 1")}>
                                Agregar Grupo 1
                            </Button>
                            <Button onClick={() => handleAddToCart(selectedMateria, "Grupo 2")}>
                                Agregar Grupo 2
                            </Button>
                        </div>
                    )}
                </DialogContent>
            </Dialog>

            {/* Carrito */}
            {isCartOpen && (
                <div className="fixed right-0 top-0 h-full w-80 bg-white shadow-lg p-4 overflow-y-auto z-50">
                    <div className="flex items-center justify-between mb-4">
                        <h3 className="text-lg font-semibold">Materias seleccionadas</h3>
                        <Button variant="ghost" onClick={() => setIsCartOpen(false)}>
                            <ChevronLeft className="w-5 h-5" />
                        </Button>
                    </div>
                    {cart.length === 0 ? (
                        <p className="text-gray-500">No hay materias en el carrito.</p>
                    ) : (
                        <ul className="space-y-3">
                            {cart.map((item) => (
                                <li
                                    key={item.id}
                                    className="border rounded-lg p-3 flex justify-between items-center"
                                >
                                    <div>
                                        <p className="font-medium">{item.nombre}</p>
                                        <p className="text-sm text-gray-500">{item.grupo}</p>
                                    </div>
                                    <Button
                                        variant="destructive"
                                        size="sm"
                                        onClick={() => handleRemoveFromCart(item.id)}
                                    >
                                        Eliminar
                                    </Button>
                                </li>
                            ))}
                        </ul>
                    )}
                </div>
            )}
        </div>
    );
}
