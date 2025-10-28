import * as React from 'react';
import { useState } from 'react';
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogDescription } from './dialog';
import { Button } from './button';
import { Input } from './input';
import { Label } from './label';
import { Textarea } from './textarea';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from './select';

interface NewRequestDialogProps {
    open: boolean;
    onClose: () => void;
    onSubmit: (data: {
        type: string;
        currentSubject: string;
        suggestedChange: string;
        observations: string;
    }) => void;
}

export function NewRequestDialog({ open, onClose, onSubmit }: NewRequestDialogProps) {
    const [formData, setFormData] = useState({
        type: '',
        currentSubject: '',
        suggestedChange: '',
        observations: ''
    });

    const [errors, setErrors] = useState<Record<string, string>>({});

    const validateForm = () => {
        const newErrors: Record<string, string> = {};

        if (!formData.type) newErrors.type = 'El tipo de solicitud es obligatorio';
        if (!formData.currentSubject) newErrors.currentSubject = 'Debes especificar la materia o grupo actual';
        if (!formData.suggestedChange) newErrors.suggestedChange = 'Debes especificar el cambio sugerido';
        if (!formData.observations) newErrors.observations = 'Las observaciones son obligatorias';

        setErrors(newErrors);
        return Object.keys(newErrors).length === 0;
    };

    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault();
        if (validateForm()) {
            onSubmit(formData);
            setFormData({ type: '', currentSubject: '', suggestedChange: '', observations: '' });
            setErrors({});
        }
    };

    const handleClose = () => {
        setFormData({ type: '', currentSubject: '', suggestedChange: '', observations: '' });
        setErrors({});
        onClose();
    };

    return (
        <Dialog open={open} onOpenChange={handleClose}>
            <DialogContent className="max-w-2xl">
                <DialogHeader className="">
                    <DialogTitle className="text-foreground">Nueva Solicitud Académica</DialogTitle>
                    <DialogDescription className="text-sm text-muted-foreground">
                        Completa el formulario para crear una nueva solicitud. Todos los campos son obligatorios.
                    </DialogDescription>
                </DialogHeader>

                <form onSubmit={handleSubmit} className="space-y-5">
                    {/* Tipo de Solicitud */}
                    <div className="space-y-2">
                        <Label htmlFor="type" className="text-sm text-foreground">Tipo de Solicitud *</Label>
                        <Select
                            value={formData.type}
                            onValueChange={(value) => setFormData({ ...formData, type: value })}
                        >
                            <SelectTrigger
                                className={`bg-card border-border rounded-lg ${errors.type ? 'border-destructive' : ''}`}
                                size="md" // ✅ requerido
                            >
                                <SelectValue placeholder="Selecciona el tipo de solicitud" />
                            </SelectTrigger>
                            <SelectContent>
                                <SelectItem value="cambio-grupo">Cambio de Grupo</SelectItem>
                                <SelectItem value="cambio-materia">Cambio de Materia</SelectItem>
                                <SelectItem value="adicion-materia">Adición de Materia</SelectItem>
                                <SelectItem value="retiro-materia">Retiro de Materia</SelectItem>
                                <SelectItem value="validacion">Validación de Materia</SelectItem>
                            </SelectContent>
                        </Select>
                        {errors.type && <p className="text-xs text-destructive">{errors.type}</p>}
                    </div>

                    {/* Materia o Grupo Actual */}
                    <div className="space-y-2">
                        <Label htmlFor="currentSubject" className="text-sm text-foreground">Materia o Grupo Actual *</Label>
                        <Input
                            id="currentSubject"
                            value={formData.currentSubject}
                            onChange={(e) => setFormData({ ...formData, currentSubject: e.target.value })}
                            placeholder="Ej: Estructuras de Datos - Grupo 01"
                            className={`bg-card border-border rounded-lg ${errors.currentSubject ? 'border-destructive' : ''}`}
                        />
                        {errors.currentSubject && <p className="text-xs text-destructive">{errors.currentSubject}</p>}
                    </div>

                    {/* Sugerencia de Cambio */}
                    <div className="space-y-2">
                        <Label htmlFor="suggestedChange" className="text-sm text-foreground">
                            Sugerencia de Cambio (Materia o Grupo Destino) *
                        </Label>
                        <Input
                            id="suggestedChange"
                            value={formData.suggestedChange}
                            onChange={(e) => setFormData({ ...formData, suggestedChange: e.target.value })}
                            placeholder="Ej: Estructuras de Datos - Grupo 02"
                            className={`bg-card border-border rounded-lg ${errors.suggestedChange ? 'border-destructive' : ''}`}
                        />
                        {errors.suggestedChange && <p className="text-xs text-destructive">{errors.suggestedChange}</p>}
                    </div>

                    {/* Observaciones */}
                    <div className="space-y-2">
                        <Label htmlFor="observations" className="text-sm text-foreground">Observaciones Adicionales *</Label>
                        <Textarea
                            id="observations"
                            value={formData.observations}
                            onChange={(e) => setFormData({ ...formData, observations: e.target.value })}
                            placeholder="Describe el motivo de tu solicitud (conflicto de horarios, disponibilidad, etc.)"
                            rows={4}
                            className={`bg-card border-border rounded-lg resize-none ${errors.observations ? 'border-destructive' : ''}`}
                        />
                        {errors.observations && <p className="text-xs text-destructive">{errors.observations}</p>}
                        <p className="text-xs text-muted-foreground">Mínimo 10 caracteres</p>
                    </div>

                    {/* Botones */}
                    <div className="flex justify-end gap-3 pt-4 border-t border-border">
                        <Button
                            type="button"
                            variant="outline" // ✅ requerido
                            size="md" // ✅ requerido
                            onClick={handleClose}
                            className="border-border rounded-lg"
                        >
                            Cancelar
                        </Button>
                        <Button
                            type="submit"
                            variant="default" // ✅ requerido
                            size="md" // ✅ requerido
                            className="bg-primary hover:bg-primary/90 text-white rounded-lg"
                        >
                            Enviar Solicitud
                        </Button>
                    </div>
                </form>
            </DialogContent>
        </Dialog>
    );
}
