package com.taskManager.rest;

import java.util.ArrayList;
import java.util.Date;
import java.util.List;

import javax.ws.rs.Consumes;
import javax.ws.rs.GET;
import javax.ws.rs.POST;
import javax.ws.rs.PUT;
import javax.ws.rs.Path;
import javax.ws.rs.PathParam;
import javax.ws.rs.Produces;
import javax.ws.rs.core.Response;

import com.taskManager.dao.GenericDAO;
import com.taskManager.entity.TaskEntity;
import com.taskManager.http.Task;

@Path("/task")
public class TaskService {

	private GenericDAO<TaskEntity> dao = new GenericDAO<TaskEntity>();

	@GET
	@Produces("application/json; charset=UTF-8")
	@Path("/getTask/{id}")
	public Task getTask(@PathParam("id") Integer id){

		TaskEntity entity = dao.getEntity("TaskEntity", id);

		if(entity != null){			

			return new Task(entity.getId(), entity.getTitulo(), entity.getDescricao());
		}

		return null;
	}

	@GET
	@Produces("application/json; charset=UTF-8")
	@Path("/tasks")
	public List<Task> tasks(){

		List<Task> tasks =  new ArrayList<Task>();

		List<TaskEntity> listaEntity = dao.getAll("TaskEntity", "and x.dataExclusao is null ");

		for (TaskEntity entity : listaEntity) {
			tasks.add(new Task(entity.getId(), entity.getTitulo(), entity.getDescricao(), entity.isStatus(), entity.getDataInclusao()));
		}

		return tasks;
	}
	
	@PUT
	@Produces("application/json; charset=UTF-8")
	@Consumes("application/json; charset=UTF-8")	
	@Path("/edit")
	public Response alterar(Task task){

		TaskEntity entity = new TaskEntity();
		try {			
			entity = newEntity(task, entity);
			entity.setDataAlteracao(new java.sql.Date(new Date().getTime()));
			
			dao.edit(entity);

			return Response.status(Response.Status.OK).build();

		} catch (Exception e) {

			return Response.status(Response.Status.INTERNAL_SERVER_ERROR).build();

		}

	}
	
	@PUT
	@Produces("application/json; charset=UTF-8")
	@Consumes("application/json; charset=UTF-8")	
	@Path("/status")
	public Response status(Task task){

		TaskEntity entity = new TaskEntity();
		try {			
			entity = newEntity(task, entity);
			entity.setDataAlteracao(new java.sql.Date(new Date().getTime()));
			dao.edit(entity);
			
			return Response.status(Response.Status.OK).build();

		} catch (Exception e) {

			return Response.status(Response.Status.INTERNAL_SERVER_ERROR).build();

		}

	}

	@POST	
	@Consumes("application/json; charset=UTF-8")
	@Produces("application/json; charset=UTF-8")
	@Path("/save")
	public Response save(Task task){

		TaskEntity entity = new TaskEntity();
		try {			
			entity = newEntity(task, entity);	
			entity.setDataInclusao(new java.sql.Date(new Date().getTime()));
			dao.save(entity);


			return Response.status(Response.Status.OK).build();

		} catch (Exception e) {

			return Response.status(Response.Status.INTERNAL_SERVER_ERROR).build();
		}

	}
	
	@PUT
	@Produces("application/json; charset=UTF-8")
	@Consumes("application/json; charset=UTF-8")	
	@Path("/remove")
	public Response remove(Task task){
		TaskEntity entity = new TaskEntity();
		try {			
			entity = newEntity(task, entity);
			entity.setDataAlteracao(new java.sql.Date(new Date().getTime()));
			dao.edit(entity);

			return Response.status(Response.Status.OK).build();

		} catch (Exception e) {

			return Response.status(Response.Status.INTERNAL_SERVER_ERROR).build();

		}
	}
	
	private TaskEntity newEntity(Task task,TaskEntity entity){		
		entity.setId(task.getId());
		entity.setTitulo(task.getTitulo());
		entity.setDescricao(task.getDescricao());
		entity.setStatus(task.isStatus());		
		return entity;
	}
}
