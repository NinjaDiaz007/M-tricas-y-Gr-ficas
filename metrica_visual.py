import numpy as np
import pandas as pd
import matplotlib.pyplot as plt
import seaborn as sns
import tkinter as tk
from tkinter import ttk
from matplotlib.backends.backend_tkagg import FigureCanvasTkAgg

# Datos de ejemplo
data = pd.DataFrame({
    'Defectos': ['Raya', 'Mancha', 'Rotura', 'Desviación', 'Desviación', 'Raya', 'Raya', 'Mancha'],
    'Frecuencia': [15, 30, 8, 22, 18, 14, 7, 25],
    'Valores': np.random.randn(8),
})

# Funciones para generar gráficas
def diagrama_espina():
    fig, ax = plt.subplots(figsize=(6, 4))
    ax.axhline(0, color='black', lw=2)
    ax.axvline(0.5, color='black', lw=2)
    ax.text(0.6, 0, "Efecto", verticalalignment='center', fontsize=14)
    ax.text(0.1, 0.2, "Causa 1", fontsize=12)
    ax.text(0.1, -0.2, "Causa 2", fontsize=12)
    ax.set_title('Diagrama de Espina de Pescado')
    return fig

def hoja_verificacion():
    print("Hoja de Verificación:")
    print(data['Defectos'].value_counts())
    return None

def grafica_barras():
    fig, ax = plt.subplots(figsize=(6, 4))
    data['Defectos'].value_counts().plot(kind='bar', color='skyblue', ax=ax)
    ax.set_title('Gráfico de Barras')
    return fig

def grafica_pastel():
    fig, ax = plt.subplots(figsize=(6, 4))
    data['Defectos'].value_counts().plot(kind='pie', autopct='%1.1f%%', colors=['skyblue', 'lightgreen', 'coral', 'purple'], ax=ax)
    ax.set_title('Gráfico de Pastel')
    return fig

def diagrama_dispersion():
    fig, ax = plt.subplots(figsize=(6, 4))
    sns.scatterplot(x=data.index, y='Valores', data=data, ax=ax)
    ax.set_title('Diagrama de Dispersión')
    return fig

def diagrama_pareto():
    sorted_data = data['Defectos'].value_counts()
    cumulative = sorted_data.cumsum() / sorted_data.sum() * 100

    fig, ax = plt.subplots(figsize=(6, 4))
    ax.bar(sorted_data.index, sorted_data.values, color='skyblue')
    ax2 = ax.twinx()
    ax2.plot(sorted_data.index, cumulative, color='orange', marker='o', linestyle='-', linewidth=2)
    ax.set_title('Diagrama de Pareto')
    ax.set_ylabel('Frecuencia')
    ax2.set_ylabel('Porcentaje acumulado')
    return fig

def grafica_control():
    fig, ax = plt.subplots(figsize=(6, 4))
    mean = data['Valores'].mean()
    std = data['Valores'].std()
    upper_control_limit = mean + 3 * std
    lower_control_limit = mean - 3 * std

    ax.plot(data['Valores'], marker='o')
    ax.axhline(mean, color='green', linestyle='--', label='Línea Central')
    ax.axhline(upper_control_limit, color='red', linestyle='--', label='Límite Superior de Control')
    ax.axhline(lower_control_limit, color='red', linestyle='--', label='Límite Inferior de Control')
    ax.set_title('Gráfica de Control')
    ax.legend()
    return fig

def histograma():
    fig, ax = plt.subplots(figsize=(6, 4))
    sns.histplot(data['Valores'], bins=10, kde=True, color='skyblue', ax=ax)
    ax.set_title('Histograma')
    return fig

# Función para mostrar el gráfico seleccionado en el canvas
def mostrar_grafico(grafico_func):
    fig = grafico_func()  # Genera la figura de la gráfica
    if fig is not None:
        canvas.figure = fig
        canvas.draw()  # Dibuja la nueva figura en el canvas

# Configuración de la interfaz gráfica usando tkinter
root = tk.Tk()
root.title("Menú de Gráficas")
root.geometry("800x600")

# Crear un frame para la selección de gráficos
frame = ttk.Frame(root)
frame.pack(side=tk.LEFT, fill=tk.Y, padx=10, pady=10)

# Canvas para mostrar las gráficas
canvas_frame = ttk.Frame(root)
canvas_frame.pack(side=tk.RIGHT, fill=tk.BOTH, expand=True)
fig, ax = plt.subplots(figsize=(6, 4))
canvas = FigureCanvasTkAgg(fig, master=canvas_frame)
canvas.get_tk_widget().pack(fill=tk.BOTH, expand=True)

# Botones para seleccionar cada gráfica
ttk.Button(frame, text="Diagrama de Espina de Pescado", command=lambda: mostrar_grafico(diagrama_espina)).pack(pady=5)
ttk.Button(frame, text="Hoja de Verificación", command=lambda: mostrar_grafico(hoja_verificacion)).pack(pady=5)
ttk.Button(frame, text="Gráfico de Barras", command=lambda: mostrar_grafico(grafica_barras)).pack(pady=5)
ttk.Button(frame, text="Gráfico de Pastel", command=lambda: mostrar_grafico(grafica_pastel)).pack(pady=5)
ttk.Button(frame, text="Diagrama de Dispersión", command=lambda: mostrar_grafico(diagrama_dispersion)).pack(pady=5)
ttk.Button(frame, text="Diagrama de Pareto", command=lambda: mostrar_grafico(diagrama_pareto)).pack(pady=5)
ttk.Button(frame, text="Gráfica de Control", command=lambda: mostrar_grafico(grafica_control)).pack(pady=5)
ttk.Button(frame, text="Histograma", command=lambda: mostrar_grafico(histograma)).pack(pady=5)

# Iniciar la interfaz gráfica
root.mainloop()
